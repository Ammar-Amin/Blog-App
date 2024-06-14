import React, { useCallback, useEffect, useState } from 'react'
import { Input, Button, Select, RealTImeEditor } from '../index'
import fileService from '../../appwrite/file'
import postService from '../../appwrite/post'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)
    const [loading, setLoading] = useState(false)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.$id || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const submit = async (data) => {
        setLoading(true)
        if (post) {
            const file = data.image[0]
                ? await fileService.uploadFile(data.image[0])
                : null

            if (file) {
                await fileService.deleteFile(post.featuredImg)
            }

            const dbPost = await postService.updatePost(post.$id, {
                ...data,
                featuredImg: file ? file.$id : undefined
            })

            if (dbPost) {
                setLoading(false)
                navigate(`/post/${dbPost.$id}`)
            }
        }
        else {
            const file = data.image[0]
                ? await fileService.uploadFile(data.image[0])
                : null

            if (file) {
                const fileId = file.$id;
                data.featuredImg = fileId
                const dbPost = await postService.createPost({
                    userId: userData.$id,
                    ...data,
                })

                if (dbPost) {
                    setLoading(false)
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const autoSlugGeneration = useCallback((value) => {
        if (value && value.length > 0) {
            const slug = value.toLowerCase().replace(/ /g, '-')
            setValue('slug', slug)
            return slug
        }
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', autoSlugGeneration(value.title,
                    { shouldValidate: true }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, autoSlugGeneration, setValue])

    if (loading) {
        return (
            <div className='w-full h-[400px] flex items-center p-5'>
                <div className='text-center text-white relative'>
                    <p className='mb-2 md:mb-5 font-semibold text-2xl md:text-6xl'>{
                        post ? 'Updating Your Post...' : 'Creating Your Post...'
                    }</p>
                    <div class="line"></div>
                </div>
            </div >
        )
    }

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap text-slate-200 pb-5">
            <div className="md:w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", autoSlugGeneration(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RealTImeEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="mt-5 md:mt-0 md:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={fileService.getFilePreview(post.featuredImg)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-5 md:mb-10"
                    {...register("status", { required: true })}
                />
                <Button text={post ? "Update" : "Submit"} type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full" />
            </div>
        </form>
    )
}
