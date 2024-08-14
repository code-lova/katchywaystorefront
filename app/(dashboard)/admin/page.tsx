import Navbar from '@/components/admin/Navbar';
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className='w-full'>
      <Navbar />
      <section className='admin text-white xl:px-[280px]'>
        <div>
          <h1>Welcome</h1>  
        </div> 
       
      </section>
     
    </div>
  );
};

// Export the component wrapped with the admin auth HOC
export default AdminDashboard
