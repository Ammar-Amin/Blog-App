import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import postService from '../appwrite/post'
import { Link, useNavigate, useParams } from 'react-router-dom'
import fileService from '../appwrite/file'
import { Button, Container, Loader } from '../components'
import parse from 'html-react-parser'

// Most posts were authored against a light canvas and carry inline `color:`
// declarations (many below 2:1 contrast on our dark background). Drop just the
// colour declaration so prose-invert governs text, and keep everything else —
// notably each post's decorative blockquote border accent.
const withoutTextColour = (style) =>
    style
        .split(';')
        .filter((decl) => decl.split(':')[0].trim().toLowerCase() !== 'color')
        .join(';')

const parseOptions = {
    replace: (node) => {
        if (node.attribs?.style) {
            node.attribs.style = withoutTextColour(node.attribs.style)
        }
    },
}

// Most posts open with a heading repeating their own title, which would render
// directly under the <h1> we already show. Drop it when it's a duplicate.
const asSlug = (html) => html.replace(/<[^>]+>/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase()

const withoutDuplicateTitle = (content, title) =>
    content.replace(
        /^\s*<h([1-3])[^>]*>([\s\S]*?)<\/h\1>/,
        (heading, _level, inner) => (asSlug(inner) === asSlug(title) ? '' : heading),
    )

export default function Post() {

    const [post, setPost] = useState(null)
    // 'loading' | 'error' | 'ready' — a failed fetch must not spin forever.
    const [status, setStatus] = useState('loading')
    const [confirmingDelete, setConfirmingDelete] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const { slug } = useParams()
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        if (!slug) {
            navigate('/')
            return
        }
        // getPost resolves to false on failure rather than throwing.
        postService.getPost(slug)
            .then(post => {
                if (post) {
                    setPost(post)
                    setStatus('ready')
                } else {
                    setStatus('error')
                }
            })
            .catch(e => {
                console.log("Post Page Error:", e)
                setStatus('error')
            })
    }, [slug, navigate])

    const isAuthor = post && userData ? userData.$id === post.userId : false

    const deletePost = () => {
        setDeleting(true)
        postService.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    fileService.deleteFile(post.featuredImg)
                    navigate('/')
                } else {
                    setDeleting(false)
                    setConfirmingDelete(false)
                }
            })
            .catch(e => {
                console.log("Post Deletion Error:", e)
                setDeleting(false)
                setConfirmingDelete(false)
            })
    }

    if (status === 'loading') return <Loader />

    if (status === 'error') {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='text-center py-16'>
                        <h1 className='text-2xl font-bold text-white'>
                            Post not found
                        </h1>
                        <p className='mt-2 text-zinc-400'>
                            This post may have been removed, or something went wrong loading it.
                        </p>
                        <Link
                            to='/'
                            className='mt-6 inline-block text-accent hover:underline'
                        >
                            &larr; Back to all posts
                        </Link>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <article className='w-full py-8'>
            <Container>
                <div className='mx-auto max-w-3xl'>

                    <Link
                        to='/'
                        className='inline-block mb-6 text-sm text-zinc-400 hover:text-accent transition-colors'
                    >
                        &larr; Back to all posts
                    </Link>

                    <div className='overflow-hidden rounded-2xl ring-1 ring-white/10 bg-zinc-900'>
                        <img
                            src={fileService.getFileView(post.featuredImg)}
                            alt={post.title}
                            className='w-full aspect-[16/9] object-cover'
                        />
                    </div>

                    <h1 className='mt-8 text-3xl md:text-4xl font-bold tracking-tight text-white'>
                        {post.title}
                    </h1>

                    <div className='mt-8 prose prose-invert prose-lg max-w-none
                        prose-headings:font-semibold prose-headings:text-white
                        prose-a:no-underline hover:prose-a:underline
                        prose-img:rounded-xl'>
                        {parse(withoutDuplicateTitle(post.content, post.title), parseOptions)}
                    </div>

                    {isAuthor && (
                        <div className='mt-12 pt-6 border-t border-white/10 flex items-center gap-3'>
                            {confirmingDelete ? (
                                <>
                                    <span className='text-sm text-zinc-300 mr-auto'>
                                        Delete this post permanently?
                                    </span>
                                    <Button
                                        text={deleting ? 'Deleting…' : 'Yes, delete'}
                                        bgColor='bg-red-600'
                                        className='text-sm py-1.5 disabled:opacity-60'
                                        disabled={deleting}
                                        onClick={deletePost}
                                    />
                                    <Button
                                        text='Cancel'
                                        bgColor='bg-zinc-700'
                                        className='text-sm py-1.5'
                                        disabled={deleting}
                                        onClick={() => setConfirmingDelete(false)}
                                    />
                                </>
                            ) : (
                                <>
                                    <span className='text-sm text-zinc-500 mr-auto'>
                                        You wrote this post
                                    </span>
                                    <Link to={`/edit-post/${post.$id}`}>
                                        <Button
                                            text='Edit'
                                            bgColor='bg-accent'
                                            className='text-sm py-1.5'
                                        />
                                    </Link>
                                    <Button
                                        text='Delete'
                                        bgColor='bg-zinc-700'
                                        className='text-sm py-1.5 hover:bg-red-600'
                                        onClick={() => setConfirmingDelete(true)}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
            </Container>
        </article>
    )
}
