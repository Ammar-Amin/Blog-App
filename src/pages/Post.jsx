import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import postService from '../appwrite/post'
import { useNavigate, useParams } from 'react-router-dom'
import fileService from '../appwrite/file'

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
        console.log(post)
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
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={fileService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {post.content}
                </div>
            </Container>
        </div>
    ) : null;
}
