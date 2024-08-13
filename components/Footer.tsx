import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='w-full bg-black text-white p-8'>
      <div className='max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div>
          <h2 className='text-lg font-bold mb-4'>About Us</h2>
          <p className='text-sm'>
            We offer the best products at the best prices. Shop our collection of high-quality goods and enjoy fast, reliable service.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-bold mb-4'>Quick Links</h2>
          <ul className='space-y-2'>
            <li><a href="#" className='hover:underline'>Home</a></li>
            <li><a href="#" className='hover:underline'>Shop</a></li>
            <li><a href="#" className='hover:underline'>Contact</a></li>
            <li><a href="#" className='hover:underline'>FAQs</a></li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-bold mb-4'>Contact Us</h2>
          <p className='text-sm'>
            Email: support@example.com<br />
            Phone: +123 456 7890<br />
            Address: 123 Main Street, City, Country
          </p>
        </div>
      </div>

      <div className='mt-8 text-center text-sm'>
        &copy; 2024 Your Company. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
