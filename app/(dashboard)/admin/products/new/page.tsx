"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';

const CreateProduct = () => {

    const [projectInput, setProjectInput] = useState({
        category_id: '',
        image: '',
        project_name: '',
        description: '',
        hash_tag_tech: '',
        code_base: '',
        project_link: '',
        demo_link: '',
        status: '',
    });

    const [error, setErrors] = useState({});
    const [picture, setPicture] = useState([]);
    const [btnLoading, setBtnLoading] = useState(false);
    const [category, setCategory] = useState([]);


    const createProject = () => {

    }


    const handleInput = () => {

    }


  return (
    <section className=''>
        <h1 className="text-3xl font-bold mb-4 uppercase text-heading-color">Add New Products</h1>
        <div className='mt-10'>
            <Link href="/admin/products" className="admin-small-btn text-sm">
                Go Back
            </Link>
        </div>  
        <p className="text-color mt-12">New Store Product Form!</p>

        <div className="">
            <div className="mt-10 card-color p-6 w-full xl:w-[1000px] shadow-shadow-1 rounded-lg border-1 border-black">

              <form encType='multipart/form-data' onSubmit={createProject}>

                <div className='mt-12 flex flex-col gap-8 lg:grid grid-cols-2'>

                  <label className='flex flex-col' htmlFor="project name">
                    <span className='font-medium mb-1 text-color'>Project Name</span>
                    <input 
                      type="text" 
                      name='project_name'
                      className='form-label' 
                      required
                      onChange={handleInput}  
                      value={projectInput.project_name}
                    />
                    {/* <span className="text-coral-red">
                      {error.project_name}
                    </span> */}
                  </label>


                  <label className='flex flex-col' htmlFor="catid">
                    <span className='font-medium mb-1 text-color'>Select Category</span>
                    <select name="category_id" className='form-label' onChange={handleInput}  value={projectInput.category_id}>
                      <option value="">Select category</option>
                      {/* {category.map((cat) => {
                        return (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        )
                      })} */}
                    </select>
                    {/* <span className="text-coral-red">
                      {error.category_id}
                    </span> */}
                  </label>

                  <label className='flex flex-col' htmlFor="image">
                    <span className='font-medium mb-1 text-color'>Project Image</span>
                    <input 
                      type="file" 
                      name='image'
                      className='form-label form-input' 
                      required
                    //   onChange={handleImage}  
                    //   ref={imageInputRef}
                    />
                    {/* <span className="text-coral-red">
                      {error.image}
                    </span> */}
                  </label>


                  <label className='flex flex-col' htmlFor="project name">
                    <span className='font-medium mb-1 text-color'>#Tag Tech-Stack</span>
                    <input 
                      type="text" 
                      name='hash_tag_tech'
                      className='form-label' 
                      required
                      onChange={handleInput}  
                      value={projectInput.hash_tag_tech}
                    />
                    {/* <span className="text-coral-red">
                      {error.hash_tag_tech}
                    </span> */}
                  </label>

                  <label className='flex flex-col' htmlFor="project name">
                    <span className='font-medium mb-1 text-color'>Code Base</span>
                    <input 
                      type="text" 
                      name='code_base'
                      className='form-label' 
                      onChange={handleInput}  
                      value={projectInput.code_base}
                    />
                    {/* <span className="text-coral-red">
                      {error.code_base}
                    </span> */}
                  </label>

                  <label className='flex flex-col' htmlFor="project name">
                    <span className='font-medium mb-1 text-color'>Project/Web Link</span>
                    <input 
                      type="text" 
                      name='project_link'
                      className='form-label' 
                      onChange={handleInput}  
                      value={projectInput.project_link}
                    />
                    {/* <span className="text-coral-red">
                      {error.project_link}
                    </span> */}
                  </label>

                  <label className='flex flex-col' htmlFor="project name">
                    <span className='font-medium mb-1 text-color'>Demo/Youtube Link</span>
                    <input 
                      type="text" 
                      name='demo_link'
                      className='form-label' 
                      onChange={handleInput}  
                      value={projectInput.demo_link}
                    />
                    {/* <span className="text-coral-red">
                      {error.demo_link}
                    </span> */}
                  </label>

                  <label className='flex flex-col' htmlFor="status">
                    <span className='font-medium mb-1 text-color'>Status</span>
                    <select name="status" className='form-label' onChange={handleInput}  value={projectInput.status}>
                      <option value="">Please Select Status</option>
                      <option value="1">Show</option>
                      <option value="0">Hide</option>
                    </select>
                    {/* <span className="text-coral-red">
                      {error.status}
                    </span> */}
                  </label>

                </div>

                <label className='flex flex-col mt-10' htmlFor="description">
                  <span className='font-medium mb-1 text-color'>Project Description</span>
                  <textarea 
                    name="description"
                    className='textarea'
                    onChange={handleInput}  
                    value={projectInput.description}
                  />
                  {/* <span className="text-coral-red">
                    {error.description}
                  </span> */}
                </label>

                
                
                <div className='mt-10 md:flex justify-center'>
                  <button type="submit" disabled={btnLoading} className='admin-form-btn'>
                    {btnLoading ? (
                      <>
                        <svg 
                          className="animate-spin h-5 w-5 text-coral-red mr-3" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                          />
                          <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 10-8 8h4l-3-3 3-3H4z"
                          />
                        </svg>
                        Processing...
                      </>
                    ): 'Make New Project'}
                  </button>
                </div>
                

              </form>
            </div>
        </div>




    </section>

  )
}

export default CreateProduct