import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import postService from '../appwrite/post'
import { Link, useNavigate, useParams } from 'react-router-dom'
import fileService from '../appwrite/file'
import { Button, Container } from '../components'
import parse from 'html-react-parser'

export default function Post() {

    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        if (slug) {
            postService.getPost(slug)
                .then(post => {
                    if (post) setPost(post)
                    else navigate('/')
                })
                .catch(e => console.log("Post Page Error:", e))
        }
        else navigate('/')
    }, [slug, navigate])

    const isAuthor = post && userData ? userData.$id === post.userId : false

    const deletePost = () => {
        postService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    fileService.deleteFile(post.featuredImg)
                    navigate('/')
                }
            })
            .catch(e => console.log("Post Deletion Error:", e))
    }

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex flex-col bg-slate-200 justify-center mb-4 relative border border-slate-600 rounded-xl">
                    <img
                        src={fileService.getFilePreview(post.featuredImg)}
                        alt={post.title}
                        className="rounded-t-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-1 top-1 md:right-6 md:top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button text='Edit' bgColor="bg-green-500 " className="mr-3 text-xs py-1 md:py-2 md:text-base" />
                            </Link>
                            <Button text='Delete' bgColor="bg-red-500" className='text-xs py-1 md:py-2 md:text-base' onClick={deletePost} />
                        </div>
                    )}
                    <div className='px-4 lg:px-8 my-4 md:mb-8'>
                        <div className="w-full">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        </div>
                        <div className="browser-css mt-2">
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : (
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
    );
}
