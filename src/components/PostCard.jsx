import React from 'react'
import fileService from '../appwrite/file'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImg }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-700 rounded-lg'>
                <div className='w-full justify-center mb-4'>
                    <img
                        src={fileService.getFilePreview(featuredImg)}
                        alt='image'
                        className='rounded-xl'
                    />
                </div>
                <h1 className='text-xl text-slate-100 font-semibold'>{title}</h1>
            </div>
        </Link>
    )
}
