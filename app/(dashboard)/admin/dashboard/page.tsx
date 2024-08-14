import React from 'react';
import Link from 'next/link';

const AdminDashboard = () => {
  return (
    <section className=''>
        <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Dashboard</h1>
        <p className='text-color'>Welcome to the admin dashboard!</p>


        <div className='mt-8 ml-4 xl:ml-0 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-72'>


            <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
                <div className='flex justify-between font-bold text-2xl items-center'>
                    <h1 className='uppercase text-color'> Number of Visits</h1>
                    <span className='text-4xl'> My Icons</span>
                </div>
                <p className='text-8xl font-extrabold text-color'>563</p>
                <p className='text-3xl font-bold text-coral-red'>Date: the date</p>
            </div>

            <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
                <div className='flex justify-between font-bold text-2xl items-center'>
                    <h1 className='uppercase text-color'> Number of Products</h1>
                    <span className='text-4xl'> my icon</span>
                </div>
                <p className='text-8xl font-extrabold text-color'>4</p>
                <p className='text-3xl font-bold text-coral-red'>
                    <Link href="/admin/products">
                        View Products
                    </Link>
                </p>
            </div>

            <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
                <div className='flex justify-between font-bold text-2xl items-center'>
                    <h1 className='uppercase text-color'>Number of users</h1>
                    <span className='text-4xl'> icon</span>
                </div>
                <p className='text-8xl font-extrabold text-color'>6</p>
                <p className='text-3xl font-bold text-coral-red'>
                    <Link href="/admin/users">
                        All users
                    </Link>
                </p>
            </div>


            <div className='p-10 card-color w-[350px] md:w-[310px] xl:w-[340px] shadow-shadow-1 rounded-lg border-1 border-black'>
                <div className='flex justify-between font-bold text-2xl items-center'>
                <h1 className='uppercase text-color'>Orders</h1>
                <span className='text-4xl'>icon</span>
                </div>
                <p className='text-8xl font-extrabold text-color'>4</p>
                <p className='text-3xl font-bold text-coral-red'>
                <Link href="/admin/orders">
                    view Orders
                </Link>
                </p>
            </div>



        </div>
    </section>
     
  );
};

export default AdminDashboard
