import React, { useEffect } from 'react'
import {Editor} from '@tinymce/tinymce-react';
import tiny from '../config/config'
import { useState } from 'react';
import service from '../appwrite/database.js'
import authservice from '../appwrite/auth'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { set } from 'react-hook-form';

function WriteBlogs() {

   const navigate = useNavigate();
  const post=useParams();
  //console.log(post);
 
  const [slug,setSlug]=useState('');
  const [title,setTitle]=useState('');
  const [content,setContent]=useState('');
  const [status,setStatus]=useState('active');
  const [image,setImage]=useState(null);
  const [author,setAuthor]=useState('');

  useEffect(() => {
    async function getuser() {
      try
      {
           const res = await authservice.getCurrentUser();
          if (res) {
              //console.log('user:', res.name);
              setAuthor(res.name);
          }
      } catch (error) {
          console.log('Error occured while fetching user', error)
      }
  }
  getuser();
}, []);

 
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await service.getPost(post.id);
        console.log('response:', response)
        if (response) {
          setTitle(response.title);
          setContent(response.content);
          setStatus(response.status);
          setSlug(response.slug);
        }
      } catch (error) {
        console.log('Error occured while fetching post', error)
      }
    }
    fetchPost();
  }, [post && post.id]);


  useEffect(() => {
    if(title.length === 0) return setSlug('');
    let newSlug = title.toLowerCase().replace(/\s+/g, '-');
    setSlug(newSlug);
  },[title])

  const updatePost = async (e) => {
    e.preventDefault();
    const userId=await authservice.getCurrentUser();
    //console.log(userId.$id);
    //console.log(image);
    const file_upload=await service.uploadFile(image);
    //console.log(file_upload.$id);
    const blog = {
      title,
      content,
      featuredimage:file_upload.$id,
      status,author}
    const updatedPost=await service.updatePost(post.id,blog);
    if(updatedPost) {
      setTitle('');
      setContent('');
      setStatus('active');
      setImage('');
      navigate('/blogs');
      
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId=await authservice.getCurrentUser();
    console.log(userId.$id);
    console.log(image);
    const file_upload=await service.uploadFile(image);
    console.log(file_upload.$id);
    const blog = {
      title,
      slug,
      content,
      featuredimage:file_upload.$id,
      status,
      userId: userId.$id ,
      author
    };
    console.log(blog);
    const createdBlog=await service.createPost(blog);
    if(createdBlog) {
      setTitle('');
      setContent('');
      setStatus('active');
      setImage('');
      navigate('/blogs')
    }

  }
 
  return (
    // this div contains the form to write the blog
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] w-full flex flex-col  items-center justify-center text-xl font-medium gap-10 p-10'>
          {/* {console.log(import.meta.env.VITE_TINYMCE_API_KEY)}; */}
          {/* // this div contains write blog form */}
          <div className=' md:w-[80%] w-full min-h-96 flex flex-col gap-4 '>

           <label className='text-[#FD356D]'>Enter the Title of the Blog: </label>
              <input type="text" name="text"  className='h-10 italic outline-none p-4' placeholder='Enter the Title of the Blog:' required value={title} 
              onChange={(e)=>{
            setTitle(e.target.value);
              }} 
               />


          <label className='text-[#FD356D]'>Slug: </label>
          <input type="text"  value={slug} className='h-10 italic outline-none p-4 text-white' disabled
          onInput={(e)=>
          setValue("slug",createSlug(e.currentTarget,value))}/>

          <label className='text-[#FD356D]'>Enter Featured Image: </label>
          <div className='h-10 italic outline-none p-4 bg-white flex items-center'>
          <input type="file" name="my-image" id="image" accept="image/gif, image/jpeg, image/png" onChange={(e)=>setImage(e.target.files[0])} required/></div>


          <label className='text-[#FD356D]'>Enter the Content of the Blog: </label>
            <Editor className='h-96 w-96 z-1 italic outline-none p-4'
              apiKey={tiny.tinymceAPIKey}
            initialValue=''
            init={
              {branding: false,
                
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
            }
            value={content}
            onEditorChange={(e)=>setContent(e)}/>


          <label className='text-[#FD356D]'>Author of the Blog: </label>
              <input type="text" name="text"  className='h-10 italic outline-none p-4' disabled value={author} />

          <label className='text-[#FD356D]'>Enter the Status(Active/Inactive): </label>
          <select name="status" className='h-10 italic outline-none p-2' value={status} 
          onChange={(e)=>setStatus(e.target.value)} required>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
             
          <button className='text-white italic bg-[#FD356D] px-4 py-2 rounded-full ' type='submit' onClick={post && post.id? updatePost: handleSubmit}>Publish</button>
       

       </div>

        </div>
    </div>
  )
}

export default WriteBlogs
