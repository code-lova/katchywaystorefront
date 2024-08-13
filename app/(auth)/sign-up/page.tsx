"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Signup = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> )=> {
      const { id, value, type, checked } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: type === 'checkbox' ? checked : value
      }));
  }

  const handleSignUpForm = async(e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Example of basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Send POST request to signup API
    try{

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json(); // Parse JSON response
      
     // Check if the response is successful (status code 2xx)
      if (response.ok) {
        // If signup is successful, navigate to the email verification page
        router.push('/verify-email');
        alert(data.message); // Show success message
      } else {
        // Show error messages returned from the server
        alert(data.error || 'Signup failed. Please try again.');
      }

    }catch(error){
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.'); // Error handling
    }finally {
      setLoading(false);
    }
    



  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        <div className='flex flex-row items-center justify-center'>
          <Image 
            src="/logo-dark.png" 
            width={25} 
            height={20} 
            alt='katchyway logo'
            className=' object-contain w-auto'
          />
          <h1 className='text-2xl font-bold mb-1 text-center uppercase orange_gradient'>atchyway Stores</h1>

        </div>
        <h2 className='text-2xl font-bold mb-6 text-center'>Create an Account</h2>
        
        <form onSubmit={handleSignUpForm} className='space-y-4'>
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
            <input 
              type='text' 
              id='name' 
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-custom-green focus:border-custom-green' 
              placeholder='John Doe'
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>

          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Username</label>
            <input 
              type='text' 
              id='username' 
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-custom-green focus:border-custom-green' 
              placeholder='John12345'
              onChange={handleInputChange}
              value={formData.username}
            />
          </div>

          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
            <input 
              type='email' 
              id='email' 
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-custom-green focus:border-custom-green' 
              placeholder='you@example.com'
              onChange={handleInputChange}
              value={formData.email}
            />
          </div>

          <div>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
            <input 
              type='password' 
              id='password' 
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-custom-green focus:border-custom-green' 
              placeholder='••••••••'
              onChange={handleInputChange}
              value={formData.password}
            />
          </div>

          <div>
            <label htmlFor='confirmPassword' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
            <input 
              type='password' 
              id='confirmPassword' 
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-custom-green focus:border-custom-green' 
              placeholder='••••••••'
              onChange={handleInputChange}
              value={formData.confirmPassword}
            />
          </div>

          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <input 
                id='agreeToTerms' 
                type='checkbox' 
                className='h-4 w-4 text-custom-green focus:ring-custom-green border-gray-300 rounded'
                onChange={handleInputChange}
                checked={formData.agreeToTerms}
              />
              <label htmlFor='agree-terms' className='ml-2 block text-sm text-gray-900'>
                <Link href="#">
                  <p>I agree to the terms and conditions</p>
                </Link>
              </label>
            </div>
          </div>

          <button 
            type='submit' 
            className='w-full bg-custom-green text-white py-2 px-4 rounded-md shadow-md hover:bg-green-700 transition duration-300' disabled={loading}>
            {loading ? 'Processing Request...': 'Sign Up'}
          </button>
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>Or sign up with</p>
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

        <div className='mt-4'>
          <Link href="/sign-in" className='flex items-center text-custom-green hover:text-green-700 transition-colors duration-300'>
            <span className='mr-2'>&#8592;</span> 
            <p className='font-bold'>Login Account</p>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;
