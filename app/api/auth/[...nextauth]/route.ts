import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '@/utils/mongodb';
import User from '@/models/user';
import bcrypt from 'bcryptjs';


// Ensure the database connection is established
connectToDB();

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and Password are required');
        }

        // Find the user with the provided email
        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with the email..!!');
        }

        // Check if the password is correct
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          throw new Error('Invalid Credentials..!!');
        }

        // If everything is valid, return the user object
        return { id: user._id.toString(), email: user.email, role: user.role };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 1 day
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user?: any }) {
       // If the user object is present (during sign-in), add user info to the token
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
        // Add user ID and role to the session object if they are available
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
    error: '/error',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
