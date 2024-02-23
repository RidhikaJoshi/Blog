import React from 'react'
import service from '../appwrite/database'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'

// here $id is the id of the entire post
// in order to get preview of the image we use service.getfilepreviw(featuredImage)
// featuredImage is the image of the post -gives id of the image
function PostCard({$id,title,featuredImage}) {
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
        <div className='w-80 h-96 p-3 shadow-sm shadow-white rounded-xl text-white flex flex-col justify-between items-center gap-4'>
            {console.log('featuredImage:', service.getfilepreviw(featuredImage))}
               {imageURL && <img src={imageURL} alt={title} className='h-[60%] w-full rounded-xl' />}
                <h2 className='text-xl font-bold'>{title}</h2>
                <button className='bg-[#FD356D] px-4 py-2 rounded-full italic'>Read</button>
                
        </div>
     </Link>
    )
}

export default PostCard 