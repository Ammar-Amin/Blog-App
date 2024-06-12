import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import postService from '../appwrite/post'

export default function EditPost() {

    const [postData, setPostData] = useState(null)
    const { slugId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slugId) {
            postService.getPost(slugId)
                .then((post) => {
                    if (post) {
                        setPostData(post)
                    }
                })
                .catch((e) => { console.log("Edit post Error :", e) })
        } else {
            navigate('/')
        }
    }, [slugId, navigate])

    return postData ? (
        <div>
            <Container>
                <PostForm post={postData} />
            </Container>
        </div>
    ) : null
}
