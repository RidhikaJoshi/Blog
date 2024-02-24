import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import service from '../appwrite/database.js'
import authservice from '../appwrite/auth'
import PostCard from '../components/PostCard';

function MyProfile() {
    const [author,setAuthor]=useState('');
    const [posts,setPosts]=useState([]);

  useEffect(() => {
    async function getuser() {
      try
      {
           const res = await authservice.getCurrentUser();
          if (res) {
              console.log('user:', res);
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
            const response = await service.getAllPosts();
            console.log('response:', response);
            setPosts(response.documents);
          } catch (error) {
            console.log('Error occured while fetching post', error)
          }
        }
        fetchPost();
      }
        , []);
  return (
    <div className='w-full min-h-[85vh] flex flex-col items-center justify-center'>
      {/* // Introduction div */}
          <div className=' min-h-[90vh]  md:w-[90%] w-full flex flex-col items-center justify-center text-2xl font-medium gap-10 p-10 text-white text-center'>

                <p className='md:text-3xl text-2xl md:font-bold underline'>User: {author}</p>
                <p>Blogs from the user:</p>
                 <div className='w-full  min-h-96 flex flex-row flex-wrap gap-4  justify-evenly'>
                {posts && posts.map((post,index)=>{
                    return <p key={index}>{post.author==author && <PostCard
                                key={post.$id}
                                $id={post.$id}
                                title={post.title}
                                featuredImage={(post.featuredimage)}
                                author={post.author}
                            />}</p>

                })}
                </div>
            </div>
    </div>
  )
}

export default MyProfile