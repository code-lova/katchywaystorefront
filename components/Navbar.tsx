"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { navLinks } from '@/constants/index';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

const Navbar = () => {

    const [toggle, setToggle ] = useState(false);
    const [active, setActive] = useState('');
    const { data: session } = useSession() // Fetch the session



  return (
    <nav className='bg-primary fixed shadow-2xl z-50 top-0 left-0 w-full text-white padding'>

        <div className='flex items-center justify-between lg:px-12'>
            <div className='cursor-pointer'>
                <Image 
                    src="/logo.webp" 
                    width={90} 
                    height={30} 
                    alt='katchyway logo'
                    className=' object-contain'
                />
            </div>

            {/* nav display as flex for larger screens if there is no session */}
            <div className='flex flex-row item-center mt-4 cursor-pointer lg:hidden'>
                {session && (
                    <div className='flex flex-row space-x-4 mt-2'>
                        <Link href='/user'>
                            <Image src="/icons/account.svg" width={25} height={30} alt='account'/>
                        </Link>
                        <Link href='/cart/4'>
                            <div className='flex mr-6'>
                                <p className='bg-white h-4 text-black rounded-full px-1 text-[10px]'>2</p>
                                <Image src="/icons/cart.svg" width={25} height={30} alt='cart'/>
                            </div>
                        </Link>
                    </div>
                )}
                <Image 
                    src={toggle ? '/icons/close.svg' : '/icons/menu.svg'} 
                    width={40} 
                    height={30} 
                    alt='menu'
                    onClick={() => setToggle(!toggle)}
                />
            </div>

            {/* nav display as flex for larger screens if there is a session */}
            {session ? (
                <ul className='hidden lg:flex item-center justify-center space-x-6'>
                    {navLinks.map((nav) => (
                        <li key={nav.id} 
                            className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px]"
                            onClick={() => setActive(nav.title)}
                        >
                           {(nav.id === 'login' || nav.id === 'signup') && session ? (
                                nav.id === 'login' ? (
                                    <Link href="" onClick={() => signOut()}>
                                        SignOut
                                    </Link>
                                ) : null
                            ) : (
                                <Link href={nav.link}>{nav.title}</Link>
                            )}
                        </li>
                    ))}
                    <li className='py-4'>
                        <Link href='/user'>
                            <Image src="/icons/account.svg" width={25} height={30} alt='account'/>
                        </Link>
                    </li>
                    <li className='py-4'>
                        <Link href='/cart/4'>
                            <div className='flex mr-6'>
                                <p className='bg-white h-4 text-black rounded-full px-1 text-[10px]'>2</p>
                                <Image src="/icons/cart.svg" width={25} height={30} alt='cart'/>
                            </div>
                        </Link>
                    </li>
                </ul>

            ):(
                <ul className='hidden lg:flex item-center justify-center space-x-6'>
                    {navLinks.map((nav) => (
                        <li key={nav.id} 
                            className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px]"
                            onClick={() => setActive(nav.title)}
                        >

                        <Link href={nav.link}>{nav.title}</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
        
        {/* Display as drop down on mobile view */}
        <ul className={`${toggle ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} bg-mobile-nav`}>
            {navLinks.map((nav) => (
                <li key={nav.id} 
                    className="text-white hover:underline py-2 hover:lg:text-white lg:transitioning lg:py-4 font-light text-[16px]"
                    onClick={() => setActive(nav.title)}
                >
                    {(nav.id === 'login' || nav.id === 'signup') && session ? (
                        nav.id === 'login' ? (
                            <Link href="" onClick={() => signOut()}>
                                SignOut
                            </Link>
                        ) : null
                    ) : (
                        <Link href={nav.link}>{nav.title}</Link>
                    )}
                </li>
            ))}
        </ul>
            
            {/* <div className="hidden lg:flex mt-[200px] space-x-4">
                {companySocials.map((socials) => (
                    <div key={socials.id} className='flex items-center rounded-md p-2'>
                        <a href={socials.link}>
                            <Image src={socials.icon} width={20} height={30} alt={socials.name}/>
                        </a>
                    </div>
                ))}
            </div> */}

    </nav>
  )
}

export default Navbar