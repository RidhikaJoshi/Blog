import React from 'react'
import service from '../appwrite/database'
import { Link } from 'react-router-dom'

// here $id is the id of the entire post
// in order to get preview of the image we use service.getfilepreviw(featuredImage)
// featuredImage is the image of the post -gives id of the image
function PostCard({$id,title,featuredImage}) {
    return (
     <Link to={`/post/${$id}`}>
        <div className='w-80 h-96 bg-green-700 text-white flex flex-col justify-between items-center gap-4'>
                <img src={featuredImage} alt={title} className='h-[60%] w-full'/>
                <h2 className='text-xl font-bold'>{title}</h2>
                <button className='bg-[#FD356D] px-4 py-2 rounded-full'>Read</button>
                
        </div>
     </Link>
    )
}

export default PostCard 