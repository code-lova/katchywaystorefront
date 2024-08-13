"use client";
import React, {useState} from 'react';
import Image from 'next/image';
import { adminNavLinks } from '@/constants/index';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';




const Navbar = () => {

    const [toggle, setToggle] = useState(false);
    const [active, setActive] = useState('');
    const { data: session } = useSession() // Fetch the session
    

  return (
    <div>
        <div className={`fixed top-0 left-0 w-64 card-color shadow-shadow-1 text-white h-full p-4 transition-transform transform ${toggle ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}>
            <div className='flex justify-between items-center my-2'>
                <Image 
                    src='/logo.webp'
                    width={70}
                    height={30}
                    className='hidden xl:flex object-contain'
                    alt='logo'
                />
                <p className="text-white-400 text-[18px] font-bold cursor-pointer sm:block hidden">Administrator</p>
            </div>

            <nav className="mt-28 xl:mt-16">
            {adminNavLinks.map((navItem) => {
                const IconComponent = navItem.icon
                return (
                <div key={navItem.id} className='admin-nav-hover mt-8'>
                    <Image 
                        src={IconComponent}
                        width={30}
                        height={40}
                        className='object-contain'
                        alt='icons'
                    />
                    {navItem.id === 'logout' ? (
                    <Link href=""
                        className={`${active === navItem.link ? 'text-red-600': ' text-heading-color'} font-bold text-lg`}
                        onClick={() => {
                        signOut()
                        window.scrollTo(0, 0);
                        setToggle(!toggle);
                        setActive(navItem.link);
                        }}>
                        SignOut
                    </Link>

                    ) : (
                    <Link 
                        href={navItem.link}
                        className={`${active === navItem.link ? 'text-red-600': ' text-heading-color'} font-bold text-lg`}
                        onClick={() => {
                        window.scrollTo(0, 0);
                        setToggle(!toggle);
                        setActive(navItem.link);

                        }}>
                        {navItem.name}
                    </Link>
                    )}
                    
                </div>
                )
            })}
            
            </nav>

            
        
        </div>
        <div className="fixed top-4 left-4 my-2 right-4 flex justify-between xl:hidden z-20">
            <Image src="/logo.webp" width={90} height={40} alt="logo" className="mr-auto" />
            <button onClick={() => setToggle(!toggle)}>
                <Image src={toggle ? '/icons/close.svg' : '/icons/menu.svg'} width={30} height={30} alt="menu" className="w-10" />
            </button>
        </div>
    </div>
  )
}

export default Navbar