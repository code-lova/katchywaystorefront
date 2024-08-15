'use client'
import React, {useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface CategoryInput {
  name: string,
  slug: string,
  status: string
}

interface Errors {
  name?: string;
  slug?: string;
  status?: string;
}


const EditCategory = () => {

  const router = useRouter();
  const params = useParams();
  const { id } = params;

  //console.log("category", id)


  const [categoryInput, setCategoryInput] = useState<CategoryInput>({
    name: "",
    slug: "",
    status: "",
  });


  const [errors, setErrors] = useState<Errors>({});

  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(id){
      const fetchCategory = async () => {
        try{

          const response = await fetch(`/api/category/categories/${id}`)
          if(!response.ok){
            throw new Error('Failed to fetch category');
          }
          const data = await response.json();
          setCategoryInput(data);
        }catch(error){
          console.error('Error fetching categories:', error);
          toast.error('Internal server error');
        }
      };

      fetchCategory();
    }
    
  }, [id])
  


    // Handle input change and validate
  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCategoryInput({ ...categoryInput, [name]: value });

    // Validate inputs as user types
    let error = "";
    if (name === "name" && value.trim().length < 2) {
        error = "Name must be at least 2 characters long.";
    } else if (name === "slug" && !value.trim()) {
        error = "Slug is required.";
    } else if (name === "status" && value === "") {
        error = "Please select a status.";
    }

    setErrors({ ...errors, [name]: error });
  };


  const updateCategory = async (e: FormEvent<HTMLFormElement>) =>{
      e.preventDefault()
     // Validate before submitting
     const validationErrors: Errors = {};
     if (!categoryInput.name.trim()) {
       validationErrors.name = "Category name is required.";
     }
     if (!categoryInput.slug.trim()) {
       validationErrors.slug = "Slug is required.";
     }
     if (!categoryInput.status) {
       validationErrors.status = "Please select a status.";
     }
 
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }

     setLoading(true);
      try {
        // Your API call here
        const response = await fetch(`/api/category/categories/${id}`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryInput) }
        );
        const data = await response.json(); // Parse JSON response
        // if response is successful
        if(response.ok){
            //router.push('/admin/category')
            toast.success(data.message);
        }else{
            toast.error(data.error || 'Process failed. Please try again.');
        }
      } catch (error) {
        toast.error("Error updating category.");
      } finally {
        setLoading(false);
      }

  }


  return (
    <section className=''>
      <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Edit/Update Categories</h1>
      <div className='mt-10'>
        <Link href="/admin/category" className="admin-small-btn text-sm">
           Go Back
        </Link>
      </div>  
      <p className="text-color mt-12">Edit/Update Categories!</p>


      <div className="mt-10 card-color p-6 xl:p-10 w-full shadow-shadow-1 rounded-lg border-1 border-black">
        <form onSubmit={updateCategory} className='mt-12 flex flex-col gap-8'>

            <label className='flex flex-col' htmlFor="name">
                <span className='font-medium mb-1 text-color'>Category Name</span>
                <input 
                    type="text" 
                    name='name'
                    className={`form-label ${errors.name ? 'border-red-500': ''}`} 
                    required
                    onChange={handleInput}  
                    value={categoryInput.name}
                />
                {errors.name && <span className="text-red-500">{errors.name}</span>}
            </label>

            <label className='flex flex-col' htmlFor="slug">
                <span className='font-medium mb-1 text-color'>Slug</span>
                <input 
                    type="text" 
                    name='slug'
                    className={`form-label ${errors.slug ? 'text-red-500' : ''}`} 
                    required
                    onChange={handleInput}  
                    value={categoryInput.slug}
                />
                {errors.slug && <span className="text-red-500">{errors.slug}</span>}
            </label>

            <label className='flex flex-col' htmlFor="status">
                <span className='font-medium mb-1 text-color'>Status</span>
                <select 
                    name="status" 
                    className={`form-label ${errors.status ? 'text-red-500' : ''}`} 
                    onChange={handleInput}  
                    value={categoryInput.status}
                >
                    <option value="">Please Select Status</option>
                    <option value="1">ON</option>
                    <option value="0">OFF</option>
                </select>
                {errors.status && <span className="text-red-500">{errors.status}</span>}
            </label>

            <div className='mt-10 md:flex justify-center'>
                <button type="submit" disabled={loading} className='my-8 w-full lg:w-[400px] md:w-[400px] rounded-lg cursor-pointer h-16 card-color shadow-shadow-1 text-coral-red tracking-wider bg-gradient-to-r from-neutral-900 hover:transitioning'>
                {loading ? 'Updating Category...': 'Update Category'}
                </button>
            </div>
            
        </form>
        

      </div>





    </section>

  )
}

export default EditCategory