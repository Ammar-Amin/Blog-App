import React, { useEffect, useState } from 'react'
import postService from '../appwrite/post'
import { Container, PostCard, MasonryGrid } from '../components'

export default function AllPosts() {

    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        postService.getPosts([])
            .then((posts) => {
                if (posts) {
                    // console.log(posts)
                    setAllPosts(posts.documents)
                }
            })
            .catch((error) => console.log("Get All Post Error :", error))
    }, [])

    if (allPosts?.length === 0) {
        return (
            <div className='w-full h-[400px] relative'>
                <div class="banter-loader">
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <MasonryGrid>
                    {
                        allPosts?.length > 0 &&
                        allPosts?.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))
                    }
                </MasonryGrid>
            </Container>
        </div>
    )
}
