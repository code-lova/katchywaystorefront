"use client"
import Link from 'next/link';
import React, {useState} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Spinner from '@/components/Spinner';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try{

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
  
      if (result?.error) {
        setError(result.error);
      } else {
        // Redirect based on the user's role
        const userRole = await getUserRole(); // Custom function to fetch the user's role
        if (userRole === 'admin') {
          router.push('/admin');
        } else if (userRole === 'user') {
          router.push('/');
        }
      }

    }catch(error){
      console.log('Internal Server error', error)
    }finally{
      setLoading(false);
    }
   
  };

  const getUserRole = async () => {
    const session = await fetch('/api/auth/session');
    const data = await session.json();
    return data.user?.role;
  };


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <div className='flex flex-row items-center justify-center'>
          <Image 
            src="/logo-dark.png" 
            width={25} 
            height={20} 
            alt='katchyway logo'
            className=' object-contain'
          />
          <h1 className='text-2xl font-bold mb-1 text-center uppercase orange_gradient'>atchyway Stores</h1>

        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

        {error && <p className="text-red-500 font-bold text-lg text-center mb-4">{error}</p>}

        
        <form className='space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              id='email' 
              className='login-form-input' 
              placeholder='you@example.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input 
              type='password' 
              id='password' 
              className='login-form-input' 
              placeholder='••••••••' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input 
                id='remember-me' 
                type='checkbox' 
                className='h-4 w-4 text-custom-green focus:ring-custom-green border-gray-300 rounded'
              />
              <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
                Remember me
              </label>
            </div>

            <div>
              <Link href='#' className='text-sm text-custom-green hover:text-green-700'>
                Forgot your password?
              </Link>
            </div>
          </div>

          <button type='submit' className='login-btn' disabled={loading}>
            {loading ? (
              <div className='flex items-center justify-center space-x-2'>
                <Spinner />
                <span>Processing...</span>
              </div>
            ):(
              'Login'
            )}
          </button>


        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>Or login with</p>
          <button className='mt-4 w-full bg-black text-white py-2 px-4 rounded-md shadow-md hover:bg-dark-yellow hover:text-black transition duration-300 flex items-center justify-center'>
            <Image 
              src="/icons/google.svg"
              width={30}
              height={30}
              alt='google'
              className='object-contain'
            />
            <span>Google</span>
          </button>
        </div>

        <div className='mt-4 flex flex-row justify-between'>
          <Link href="/" className='flex items-center text-custom-green hover:text-green-700 transition-colors duration-300'>
            <span className='mr-2'>&#8592;</span> 
            <p>Back to Home Page</p>
          </Link>

          <Link href="/sign-up" className='flex items-center text-custom-green hover:text-green-700 transition-colors duration-300'>
            <p>Create An Account</p>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
