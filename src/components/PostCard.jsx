import React from 'react'
import service from '../appwrite/database'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { IoEyeSharp } from "react-icons/io5";

// here $id is the id of the entire post
// in order to get preview of the image we use service.getfilepreviw(featuredImage)
// featuredImage is the image of the post -gives id of the image
function PostCard({$id,title,featuredImage,author,Likes,comments,views}) {
    const [imageURL, setImageURL] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageURL = await service.getfilepreviw(featuredImage);
                setImageURL(imageURL);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        };

        fetchImage();
    }, [featuredImage]);
     return (
      <Link to={`/blogs/${$id}`}>
          <div className='w-80 h-[30rem] p-3 shadow-sm shadow-white rounded-xl text-white flex flex-col justify-between items-center gap-4'>
                {imageURL && <img src={imageURL} alt={title} className='h-[200px] w-full'/>}
                     <h2 className='text-xl text-center font-bold'>{title}</h2>
                     <p className='text-sm text-center '>Author: {author}</p>
                     <div className='flex flex-row gap-4'>
                        <p className='text-white flex flex-row items-center gap-2'><IoEyeSharp /> {views}</p>
                        <p className='text-white flex flex-row items-center gap-2'><FaHeart /> { Likes} </p>
                        <p className='text-white flex flex-row items-center gap-2'><AiFillMessage /> { comments} </p>
                    </div>
                     <button className='bg-[#FD356D] px-4 py-2 rounded-full italic'>Read</button>
                     
          </div>
      </Link>
     )
}

export default PostCard 