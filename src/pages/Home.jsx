import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../components'
import postService from '../appwrite/post'

export default function Home() {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    console.log("All Posts", posts)
                    setAllPosts(posts.documents)
                }
            })
            .catch(e => console.log("Home page Error :: all Posts :", e))
    }, [])

    if (allPosts.length === 0) {
        return (
            <div className='w-full h-[400px] flex items-center p-5'>
                <div className='text-center text-white'>
                    <p className='font-semibold text-3xl md:text-6xl'>Blog App using React & Appwrite </p>
                    <p className='mt-5 text-xl md:text-3xl text-red-400'>Login to see Posts </p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap gap-1'>
                    {
                        allPosts.length > 0 &&
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-[142px]'>
                                {/* <PostCard post={post} /> */}
                                {/* OR  */}
                                <PostCard {...post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
