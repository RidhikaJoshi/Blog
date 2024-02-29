import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwrite/database'
import authService from '../appwrite/auth'
import { useState } from 'react'
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";

function ReadBlog() {
    const [user, setUser] = useState(null);
    const [blogUser, setBlogUser] = useState(null);
    const [post, setPost] = useState(null);
    const  slug  = useParams();
    console.log(slug.id);
    const [imageURL, setImageURL] = useState(null);
    const navigate=useNavigate();
    const [likes,setlikes]=useState(false);

    useEffect(() => {
        async function getuser() {
            try
            {
                 const res = await authService.getCurrentUser();
                if (res) {
                    console.log('user:', res.$id);
                    setUser(res.$id);
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
                    const response = await service.getPost(slug.id);
                    console.log('response:', response)
                    if (response) {
                        setPost(response);
                        setBlogUser(response.userId);
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

    useEffect(() => {
        const update = async () => {
            try {
                const response = await service.updatePost(slug.id, {
                    title: post.title,
                    content: post.content,
                    featuredImage: post.featuredImage,
                    status: post.status,
                    userId: post.userId,
                    author: post.author,
                    Likes: post.Likes,
                    UserLiked: post.UserLiked
                });
            }
            catch (error) {
                console.log('Error occured while updating post', error);
            }
        }
        update();

        
    }, [post && post.Likes]); 

    const handleDelete = async () => {
        try {
            const response = await service.deletePost(slug.id);
            console.log('response:', response);
            if (response) {
                navigate('/blogs');
            }
        } catch (error) {
            console.log('Error occured while deleting post', error);
        }
    }

  return (
   <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className=' min-h-[85vh] md:w-[90%] w-full flex flex-row items-center justify-center text-xl font-medium '>
                <div className='min-h-[85vh] bg-[#0F172A] md:w-[90%] w-full md:p-10 p-5 justify-center items-center flex flex-col gap-10' >
                    {/* {post && console.log("ReadBlog:", post.Likes)} */}
                    <h1 className='text-white font-bold md:text-2xl text-lg'>{post && post.title}</h1>
                    <p className='text-white text-lg'>Author of the Blog: {post && post.author}</p>
                    <p className='text-gray-300 flex flex-row items-center gap-2 ' >
                        <FaHeart
                            onClick={() => {
                                if(!user) navigate('/login');
                                if (post && likes && post.UserLiked.includes(user)) {
                                    setlikes(false);
                                    setPost(prevPost => ({
                                        ...prevPost,
                                        Likes: prevPost.Likes - 1,
                                        UserLiked: prevPost.UserLiked.filter(item => item !== user)
                                    }));
                                } 
                            else {
                                    setlikes(true);
                                    setPost(prevPost => ({
                                        ...prevPost,
                                        Likes: prevPost.Likes + 1,
                                        UserLiked: [...prevPost.UserLiked, user]
                                    }));
                                }
                            }}
                            style={{ color:  post && post.UserLiked.includes(user) ? '#FD356D' : 'white' }}
                        />
                        {post &&  post.Likes}
                    </p>
                    <img src={imageURL} alt={post && post.title} className='h-72 md:w-[50%] w-[90%]' />
                    <p className='text-white text-lg'>{post && parse(post.content)}</p>

                    {user && blogUser && user === blogUser && (
                        <div className='flex flex-row items-center justify-center gap-5'>
                            <button className='bg-[#FD356D] text-white px-4 py-2 rounded-md' 
                                onClick={() => navigate('/write/' + slug.id)}>Edit</button>
                            <button className='bg-[#FD356D] text-white px-4 py-2 rounded-md' onClick={handleDelete}>Delete</button>
                        </div>
                    )}
                </div>
           
        </div>
    </div>
  )
}

export default ReadBlog