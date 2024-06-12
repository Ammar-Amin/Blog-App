import React, { useCallback, useEffect } from 'react'
import { Input, Button, Select, RealTImeEditor } from '../index'
import fileService from '../../appwrite/file'
import postService from '../../appwrite/post'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PostForm({ post }) {

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    })

    const submit = async (data) => {
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
                    navigate(`/post/${dbPost.$id}`)
                }
            }

        }
    }

    const autoSlugGeneration = useCallback((value) => {
        if (value && value.length > 0) {

            // const slug = value.toLowerCase().replace(/ /g, '-')
            // setValue('slug', slug)
            // return slug

            // OR 

            return value
                .trim()
                .toLowerCase()
                .replace(/^[a-zA-Z\d\s]+/g, '-')
        } else {
            return ''
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

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
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
            <div className="w-1/3 px-2">
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
                            src={fileService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}
