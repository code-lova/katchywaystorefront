import React, { ReactNode } from 'react'
import Navbar from '@/components/admin/Navbar'

const AdminLayout = ({ children}: { children: ReactNode }) => {
  return (
    <div className='admin flex flex-col min-h-screen text-white xl:px-[280px] px-4 pt-28 xl:pt-2 '>
        <Navbar />
        <div className='flex-grow px-4 pt-10 pb-10'>{children}</div>
        <footer className='py-4'>Admin Footer</footer>
    </div>
  )
}

export default AdminLayout