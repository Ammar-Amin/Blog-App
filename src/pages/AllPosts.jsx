import React, { useEffect, useState } from 'react'
import postService from '../appwrite/post'
import { Container, PostCard } from '../components'

export default function AllPosts() {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    console.log(posts)
                    setAllPosts(posts.documents)
                }
            })
            .catch((error) => console.log("Get All Post Error :", error))
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {
                        allPosts.length > 0 &&
                        allPosts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard post={post} />
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}
