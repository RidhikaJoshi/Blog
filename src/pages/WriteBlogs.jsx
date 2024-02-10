import React from 'react'
import {Editor} from '@tinymce/tinymce-react';
import tiny from '../config/config'
import { useState } from 'react';

function WriteBlogs() {

  const [title,setTitle]=useState('');
  const [slug,setSlug]=useState('');
  const [content,setContent]=useState('');
  const [status,setStatus]=useState('');
  const [image,setImage]=useState('');


  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] w-full flex flex-col  items-center justify-center text-xl font-medium gap-10 p-10'>
          {/* {console.log(import.meta.env.VITE_TINYMCE_API_KEY)}; */}
          {/* // this div conatins write blog form */}
          <div className='   w-[80%] min-h-96 flex flex-col gap-4'>

           <label className='text-[#FD356D]'>Enter the Title of the Blog: </label>
          <input type="text" name="text"  className='h-10 italic outline-none p-4' placeholder='Enter the Title of the Blog:' required value={title} onChange={(e)=>setTitle(e.target.value)}/>


          <label className='text-[#FD356D]'>Slug: </label>
          <input type="text"   className='h-10 italic outline-none p-4' disabled/>

          <label className='text-[#FD356D]'>Enter Featured Image: </label>
          <input type="file" name="my-image" id="image" accept="image/gif, image/jpeg, image/png" required/>


          <label className='text-[#FD356D]'>Enter the Content of the Blog: </label>
            <Editor 
              apiKey={tiny.tinymceAPIKey}
            initialValue=''
            init={
              {branding: false,
                width:950,
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }
            }/>

          <label className='text-[#FD356D]'>Enter the Status(Active/Inactive): </label>
          <select name="status" id="status" className='h-10 italic outline-none p-4' defaultValue="active" required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
             
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit'>Publish</button>
       

       </div>

        </div>
    </div>
  )
}

export default WriteBlogs