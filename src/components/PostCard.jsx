import React from 'react'
import fileService from '../appwrite/file'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImg }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-slate-700 rounded-lg overflow-hidden'>
                <div className='w-full justify-center'>
                    <img
                        src={fileService.getFilePreview(featuredImg)}
                        alt='image'
                        className='rounded-t-xl hover:opacity-90'
                    />
                </div>
                <h1 className='py-4 text-xl text-center text-slate-200 font-semibold hover:text-white hover:bg-stone-700'>{title}</h1>
            </div>
        </Link>
    )
}
