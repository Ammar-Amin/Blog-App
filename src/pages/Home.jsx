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
            <div className='text-white text-4xl text-center'>
                Login to get Posts
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        allPosts.length > 0 &&
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
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
