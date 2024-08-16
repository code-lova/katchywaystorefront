"use client"
import React, {useState, useEffect, FormEvent} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Loading from '@/components/admin/Loading';


type Category = {
  _id: string,
  name: string,
  slug: string,
  status: number,

}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);


  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {

        const response = await fetch('/api/category/categories');

        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.log("failed to fetch categories")
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Internal server error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);


  const deleteCategory = async(e: FormEvent, categoryId: string) => {
    const confirmDelete  = confirm("Are you sure you want to delete this category?")
    if(!confirmDelete) return;

    try {
      const response = await fetch(`/api/category/categories/${categoryId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Category deleted successfully');
        // Update state by removing the deleted category
        setCategories(categories.filter((cat) => cat._id !== categoryId));
      } else {
        toast.error('Failed to delete category');
      }
    }catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Internal server error');
    }

  }


  if (loading) {
    return (
      <div className='ml-[300px]'>
         <Loading />
      </div>
    );
  }


  return (
    <section className=''>
      <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Product Categories</h1>
      <div className='mt-10'>
        <Link href="/admin/category/new" className="admin-small-btn text-sm">
            Create New category
        </Link>
      </div>  
      <p className="text-color mt-12">List of all Projects Categories!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-72 text-center">

        {categories.length > 0 ? categories.map((catItem) => (

          <div key={catItem._id} id='catcard' className="mt-10 card-color p-6 w-[300px] shadow-shadow-1 rounded-lg border-1 border-black">
            {catItem.name === "Women" ? (

              <Image
                src='/images/women.webp'
                alt="download"
                className="block mx-auto rounded-xl object-contain"
                width={400}
                height={150}
              />
            ): (
              <Image
                src='/images/men.webp'
                alt="download"
                className="block mx-auto rounded-xl object-contain"
                width={400}
                height={150}
              />
            )}
            
            <p className="text-base font-extrabold text-color mt-6">
                {catItem.name}
            </p>

            <div className="flex justify-between mt-4">
              <Link href={`/admin/category/${catItem._id}`} className="admin-small-btn">
                Edit
              </Link>

              <button 
                className="admin-small-btn"
                onClick={(e) => deleteCategory(e, catItem._id)}
              >
                Delete
              </button>
            </div>
          </div>
        )): (
          <div className="mt-16 card-color p-6 w-[300px] md:w-[400px] lg:ml-40 shadow-shadow-1 rounded-lg border-1 border-black">
          <p className="text-heading-color font-semibold text-[18px]">You have not created any category yet</p>
          </div>
        )}
       
                  
      </div>



    </section>
  )
}

export default Category