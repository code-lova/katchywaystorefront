import React from 'react';
import Image from 'next/image';
import { features } from '@/constants/index';
import Link from 'next/link';

const Banner = () => {
  return (
    <div>
        <div className='hidden lg:flex items-center justify-between'>

            {features.map((item)=> (
                <div key={item.name} className='flex flex-row items-center space-x-4 mt-8'>
                    <Image 
                        src={item.image}
                        width={22}
                        height={10}
                        alt={item.name}
                        className='object-contain'
                    />
                    <div>
                        <p className='text-black'>
                            {item.name}
                        </p>
                        <p className='text-slate-gray'>
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3 mt-[4rem]'>

            <Link href="/">
                <div className='cursor-pointer bg-herobg-gray rounded-sm px-4 py-1 h-auto w-full transition-all duration-500 ease-in-out xl:hover:bg-[#faf6e9]'>
                    <div className='mt-8'>
                        <div className='flex justify-center'>
                            <Image 
                                src="/collections/slides.webp" 
                                width={276} 
                                height={80}
                                alt='men slides' 
                                loading='lazy'
                                className='object-fit mx-auto'
                            />
                        </div>
                        <div className='mt-4'>
                            <h1 className='font-bold w-full text-xl font-palanquin'>Classic Collection</h1>
                            <p className='font-extrabold text-4xl mb-1'>Men Slides</p>
                        </div>
                    </div>
                </div>
            </Link>
            <Link href="/">
                <div className=' bg-herobg-gray rounded-sm px-4 py-1 h-auto w-full transition-all duration-500 ease-in-out xl:hover:bg-[#faf6e9]'>
                    <div className='mt-4'>
                        <div className='flex justify-center'>
                            <Image 
                                src="/collections/shoes.webp" 
                                width={250} 
                                height={80}
                                alt='men slides' 
                                loading='lazy'
                                className='object-fit'
                            />
                        </div>
                        <div>
                            <h1 className='font-bold w-full text-xl font-palanquin'>Classic Collection</h1>
                            <p className='font-extrabold text-4xl'>Men Shoes</p>
                        </div>
                    </div>
                    
                </div>
            </Link>
        </div>
       
    </div>
  )
}

export default Banner