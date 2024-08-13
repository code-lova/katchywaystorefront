"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const EmailConfirmation = () => {

    const [code, setCode ] = useState({
        otp: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Handle input change to update the OTP code in the state
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCode((prevData) => ({
            ...prevData,
            [name]: value, // Update the 'otp' field with the input value
        }));
    };


    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await fetch('/api/verifyemail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(code)
            })

            const data  = await response.json();

            if(response.ok){
                router.push('/sign-in')
                alert(data.message);
            }else{
                setError(data.error);
            }

        }catch(error){
            console.log("Internal server error", error)
        } finally {
            setLoading(false)
        }
    }



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
        <h2 className='text-2xl font-bold mb-6 text-center'>Email Verification</h2>
        
        <form className='space-y-4' onSubmit={handleSubmit}>

          <div>
            <label htmlFor='otp' className='block text-sm font-medium text-gray-700'>OTP Verification Code</label>
            <input 
                type='text'
                name='otp' 
                className='login-form-input' 
                placeholder='Enter OTP Code' 
                onChange={handleInput}  
                value={code.otp}  
            />
          </div>

          {error && <p className='text-red-500'>{error}</p>}

          <button type='submit' className='login-btn' disabled={loading}>
            {loading ? 'Verifying...': 'Verify My Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailConfirmation;
