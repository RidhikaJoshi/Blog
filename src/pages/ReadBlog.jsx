import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwrite/database'
import { useState } from 'react'
import parse from "html-react-parser";

function ReadBlog() {
        const [post, setPost] = useState(null);
        const  slug  = useParams();
        const [imageURL, setImageURL] = useState(null);

       useEffect(() => {
            async function fetchPost() {
                try {
                    const response = await service.getPost(slug.id);
                    console.log('response:', response)
                    if (response) {
                        setPost(response);
                    }
                } catch (error) {
                    console.log('Error occured while fetching post', error)
                }
            }
            fetchPost();
        }, [slug.id]);

        

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageURL = await service.getfilepreviw(post.featuredimage);
                setImageURL(imageURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [post && post.featuredimage]);

  return (
   <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] w-[90%] flex flex-row items-center justify-center text-xl font-medium '>
                <div className='min-h-[85vh] w-[90%] p-10 justify-center items-center flex flex-col gap-10' >
                    <h1 className='text-white font-bold text-2xl'>{post && post.title}</h1>
                    
                    <img src={imageURL} alt={post && post.title} className='h-72 w-[50%]' />
                    <p className='text-white text-lg'>{post && parse(post.content)}</p>
                </div>
           
        </div>
    </div>
  )
}

export default ReadBlog