import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import service from '../appwrite/database'
import authService from '../appwrite/auth'
import { useState } from 'react'
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

function ReadBlog() {
    const [user, setUser] = useState(null);
    const [blogUser, setBlogUser] = useState(null);
    const [post, setPost] = useState(null);
    const  slug  = useParams();
    console.log(slug.id);
    const [imageURL, setImageURL] = useState(null);
    const navigate=useNavigate();
    const [likes,setlikes]=useState(false);
    const [seecomments,setseecomments]=useState(false);
   const [commentvalue,setcommentvalue]=useState('');

   

    useEffect(() => {
        async function getuser() {
            try
            {
                 const res = await authService.getCurrentUser();
                if (res) {
                    console.log('user:', res);
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
        const update=async()=>{
            try {
                post.Likes=post.UserLiked.length;
                const response = await service.updatePost(slug.id, post);
                console.log('response:', response);
            } catch (error) {
                console.log('Error occured while updating post', error);
            }
        }
        if(post){
            update();
        }

        
    }, [post && post.UserLiked]); 

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

    const handlecomments = () => {
        if(!user) navigate('/login');
        setseecomments(!seecomments);
    }

const handlecommentsSubmit = async () => {
    if (!user) {
        navigate('/login');
        return;
    }
    if (!commentvalue) return;
    try {
        const res = await authService.getCurrentUser();
        const value = `${res.name}: ${commentvalue}`; // Format comment as a string
        const updatedComments = [...post.comments, value]; // Add new comment to existing comments array
        const updatedPost = {
            ...post,
            comments: updatedComments,
        };
        setPost(updatedPost); // Update local state
        console.log("after updating post: ", updatedComments);
        const response = await service.updatePost(slug.id, updatedPost); // Update post in the database
        console.log('update comments response:', response);
    } catch (error) {
        console.log('Error occurred while fetching user', error);
    }
    setcommentvalue('');
}


  return (
   <div className='w-full min-h-[85vh] flex items-center justify-center'>
        <div className=' min-h-[85vh] md:w-[90%] w-full flex flex-row items-center justify-center text-xl font-medium '>
                <div className='min-h-[85vh] bg-[#0F172A] md:w-[90%] w-full md:p-10 p-5 justify-center items-center flex flex-col gap-10' >
                    {/* {post && console.log("ReadBlog:", post.Likes)} */}
                    <h1 className='text-white font-bold md:text-2xl text-lg'>{post && post.title}</h1>
                    <p className='text-white text-lg'>Author of the Blog: {post && post.author}</p>
                    
                    <img src={imageURL} alt={post && post.title} className='h-72 md:w-[50%] w-[90%]' />
                    <p className='text-white text-lg'>{post && parse(post.content)}</p>
                    <div className='flex flex-row items-center gap-6'>
                        <p className='text-gray-300 flex flex-row items-center gap-2' >
                            <FaHeart
                                onClick={() => {
                                    if(!user) navigate('/login');
                                    if (post  && post.UserLiked.includes(user)) {
                                        setlikes(false);
                                        setPost(prevPost => ({
                                            ...prevPost,
                                            UserLiked: prevPost.UserLiked.filter(item => item !== user),
                                            Likes:post.UserLiked.length
                                        }));
                                    } 
                                else {
                                        setlikes(true);
                                        setPost(prevPost => ({
                                            ...prevPost,
                                            UserLiked: [...prevPost.UserLiked, user],
                                            Likes:post.UserLiked.length
                                        }));
                                    }
                                }}
                                style={{ color:  post && post.UserLiked.includes(user) ? '#FD356D' : 'white' }}
                            />
                            {post &&  post.UserLiked.length}
                        </p>
                        <p className='text-white flex flex-row items-center gap-2' onClick={handlecomments}><AiFillMessage />{post && post.comments.length}</p>
                    </div>
                    {seecomments && user && post && post.comments && (
                        <div className='w-full gap-6 flex flex-col'>
                            <h1 className='text-white font-bold text-xl underline'>Comments</h1>
                            {post.comments.length==0? 
                            <p className='text-white'>No comments yet</p>
                            :
                            post.comments.map((comment, index) => (
                                <div key={index} className='flex flex-row items-center gap-2 text-white'>
                                    <FaUser /><p className='text-white'>{comment}</p>
                                </div>
                            ))}
                            <div className='flex flex-row item-center'>
                                <input type="text" className='h-10 italic outline-none p-4 w-[75%]' placeholder='Enter your comment' value={commentvalue} onChange={(e) => setcommentvalue(e.target.value)} />
                                <input type="submit" className='bg-[#FD356D] text-white px-4 py-2 rounded-md w-[25%]' value='Submit' onClick={handlecommentsSubmit} />
                            </div>
                        </div>
                    )   
                    }
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