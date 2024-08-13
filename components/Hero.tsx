"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { heroImage } from '@/constants/index';
import Link from 'next/link';

const Hero = () => {
    const [current, setCurrent] = useState(0);
    const length = heroImage.length;

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
        nextSlide();
        }, 5000); // Change slide every 5 seconds
        return () => clearTimeout(timer);
    }, [current]);

    if (!Array.isArray(heroImage) || heroImage.length <= 0) {
        return null;
    }

  return (
    <div className='relative py-20 bg-black bg-opacity-50 lg:bg-herobg-gray'>
      <div className='relative h-full'>
        {heroImage.map((hero, index) => (
            <div
                key={hero.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                index === current ? 'opacity-100' : 'opacity-0'
                }`}
            >
            {index === current && (
              <div className='flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 lg:space-x-28 md:space-x-14'>
                <Image
                  src={hero.image}
                  width={350}
                  height={200}
                  alt={hero.name}
                  className='object-contain'
                />

                {/* display for larger screen devices */}
                <div className='hidden md:block leading-tight text-center md:text-left'>
                  <p className='lg:hero-text-gray md:text-white uppercase font-thin text-[40px]'>{hero.title}</p>
                  <p className='lg:text-semi-dark md:text-white uppercase font-bold text-[30px]'>{hero.title2}</p>
                     <div className='mt-4'>
                        <Link href="/products">
                          <div className='flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 cursor-pointer'>
                              <button className='border lg:border-dark-yellow md:border-white py-4 px-8 font-semibold lg:hero-text-gray uppercase md:text-white'>See More</button>
                              <button className='bg-custom-green py-4 px-8 text-white uppercase'>Shop now</button>
                          </div>
                        </Link>
                    </div>
                </div>

                {/* display for smaller devices  */}
                <div className='md:hidden sm:block absolute leading-tight text-center md:text-left'>
                  <p className='text-white uppercase font-thin text-[40px]'>{hero.title}</p>
                  <p className='text-white uppercase font-bold text-[30px]'>{hero.title2}</p>
                  <div className='mt-4'>
                    <Link href="/products">
                      <div className='flex flex-col md:flex-row items-center justify-center md:justify-start space-y-4 md:space-y-0 md:space-x-4 cursor-pointer'>
                        <button className='border border-white py-4 px-8 font-semibold text-white uppercase'>See More</button>
                        <button className='bg-custom-green py-4 px-8 text-white uppercase'>Shop now</button>
                      </div>
                    </Link>
                  </div>
                </div>
                
              </div>
            )}
          </div>
        ))}
        {/* Left and right button to control slider  */}
        <div className='flex justify-between py-20'>
            <button
                className=' left-4 transform  text-white bg-gray-800 bg-opacity-50 p-2 rounded-full'
                onClick={prevSlide}
            >
            &#10094;
            </button>
            <button
                className='right-4 transform  text-white bg-gray-800 bg-opacity-50 p-2 rounded-full'
                onClick={nextSlide}
            >
                &#10095;
            </button> 
        </div>

        {/* Indicators below the slider  */}
        <div className='absolute mt-12 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            {heroImage.map((_, index) => (
                <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${index === current ? 'bg-gray-800' : 'bg-gray-400'}`}
                    onClick={() => setCurrent(index)}
                />
            ))}
      </div>

      </div>
     
      
    </div>
  );
};

export default Hero;
