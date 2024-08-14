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
            <div className='flex flex-col my-2'>
               <div className='flex flex-1'>
                <Image 
                        src='/logo.webp'
                        width={90}
                        height={30}
                        className='hidden xl:flex object-contain'
                        alt='logo'
                    />
               </div>
                <div className='flex flex-col justify-center items-center mt-20 xl:mt-6'>
                    <Image
                        src="/icons/profile.svg"
                        width={60}
                        height={60}
                        className=''
                        alt='admin logo'
                    />

                    {session && session.user && (
                        <p className="text-white-400 text-base font-thin cursor-pointer">
                            {session.user.name}
                        </p>
                    )}
                </div>
               
                
            </div>

            <nav className="mt-12 xl:mt-8">
            {adminNavLinks.map((navItem) => {
                const IconComponent = navItem.icon
                return (
                <div key={navItem.id} className='admin-nav-hover mt-4'>
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