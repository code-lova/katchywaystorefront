"use client";
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
  session?: any; // Replace `any` with the appropriate type if you have a session type defined.
}

const Provider = ({ children, session }: ProviderProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default Provider;
