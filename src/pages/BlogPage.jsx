import React from 'react'
import service from '../appwrite/database'
import { useState,useEffect } from 'react'
import PostCard from '../components/PostCard';

function BlogPage() {
    const[allPosts,setAllPosts] = useState([]);

   useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await service.getAllPosts();
                console.log('response:', response)
                if (response.documents) {
                    setAllPosts(response.documents);
                }
            } catch (error) {
                console.log('Error occured while fetching posts', error)
            }
        }
        fetchPosts();
    }, []);

  return (
    <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className='min-h-[85vh] w-[90%] flex flex-row items-center justify-center text-xl font-medium gap-10 p-10'>
           <div className='w-full min-h-96 flex flex-row flex-wrap gap-4  justify-evenly'>
             {allPosts.length > 0 &&
                        allPosts.map((post) => (
                            <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={(post.featuredimage)}
                            />
                        ))}
           </div>
        </div>
    </div>
  )
}

export default BlogPage