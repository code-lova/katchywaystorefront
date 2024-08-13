import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Newproduct = () => {
  return (
    // here we are going to use a callback function
    <div className='mt-10'>
        <div className='text-center '>
            <h1 className='font-semibold text-3xl uppercase text-slate-700'>New Products</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, quae?</p>
        </div>

        {/* For desktop devices */}
        <Link href="/products">
            <div className='xl:grid grid-cols-3 gap-4 py-8 hidden lg:hidden cursor-pointer '>

                <div className='grid grid-cols-1'>

                    <div className='overflow-hidden'>
                        <div className='xl:transitioning'>
                            <Image 
                                src="/collections/casual.webp"
                                width={400}
                                height={100}
                                alt='new-products'
                                loading='lazy'
                                className='object-contain mx-auto'
                            />
                        </div>
                    </div>
                    <div className='text-center text-lg'>
                        <h1 className='font-bold font-montserrat mb-4'>Prodct name</h1>
                        <p className='text-custom-green'>#12000</p>
                    </div>

                </div>

                <div className='grid grid-cols-1'>

                <div>
                    <Image 
                        src="/collections/casual.webp"
                        width={400}
                        height={100}
                        alt='new-products'
                        className='object-contain mx-auto'
                    />
                </div>
                <div className='text-center'>
                    <h1>Prodct name</h1>
                    <p>#12000</p>
                </div>

                </div>

                <div className='grid grid-cols-1'>
                    <div>
                        <Image 
                            src="/collections/casual.webp"
                            width={400}
                            height={100}
                            alt='new-products'
                            className='object-contain mx-auto'
                        />
                    </div>
                    <div className='text-center text-lg'>
                        <h1 className='font-bold font-montserrat mb-4'>Prodct name</h1>
                        <p className='text-custom-green'>#12000</p>
                    </div>
                </div>

            </div>
        </Link>

        {/* For large and small screens */}
        <div className='xl:hidden grid grid-cols-2 py-8 gap-2'>
            <Link href="/products">
                <div className='grid grid-cols-1'>
                    <div>
                        <Image 
                            src="/collections/casual.webp"
                            width={200}
                            height={100}
                            alt='new-products'
                            className='object-contain mx-auto'
                        />
                    </div>
                    <div className='text-center text-lg'>
                        <h1 className='font-bold font-montserrat mb-4'>Prodct name</h1>
                        <p className='text-custom-green'>#12000</p>
                    </div>
                </div>
            </Link>

            <div className='grid grid-cols-1'>
                <div>
                    <Image 
                        src="/collections/casual.webp"
                        width={200}
                        height={100}
                        alt='new-products'
                        className='object-contain mx-auto'
                    />
                </div>
                <div className='text-center text-lg'>
                    <h1 className='font-bold font-montserrat mb-4'>Prodct name</h1>
                    <p className='text-custom-green'>#12000</p>
                </div>
            </div>
        </div>


    </div>
  )
}

export default Newproduct