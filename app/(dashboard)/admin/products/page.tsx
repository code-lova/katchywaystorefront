import React from 'react'
import Link from 'next/link'

const Products = () => {
  return (
    <section className=''>
      <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Products</h1>
      <div className='mt-10'>
        <Link href="/admin/products/new" className="admin-small-btn text-sm">
            Add new Product to store
        </Link>
      </div>  
      <p className="text-color mt-12">List of all Products!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-72 text-center">
        
      </div>




    </section>
  )
}

export default Products