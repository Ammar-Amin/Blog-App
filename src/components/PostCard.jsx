import React, { useState } from 'react'
import fileService from '../appwrite/file'
import { Link } from 'react-router-dom'

export default function PostCard({ $id, title, featuredImg }) {
    const [loaded, setLoaded] = useState(false)

    return (
        <Link
            to={`/post/${$id}`}
            className={`group relative block break-inside-avoid mb-4 rounded-2xl overflow-hidden
                ring-1 ring-white/10 bg-zinc-800 shadow-md transition-shadow duration-300
                hover:shadow-[0_12px_40px_-12px_rgba(154,121,255,0.55)]
                ${loaded ? '' : 'min-h-[220px]'}`}
        >
            {/* Skeleton while the image loads so columns don't jump */}
            {!loaded && <div className='absolute inset-0 animate-pulse bg-zinc-700' />}

            <img
                src={fileService.getFilePreview(featuredImg)}
                alt={title}
                loading='lazy'
                onLoad={() => setLoaded(true)}
                className={`w-full h-auto block object-cover transition-transform duration-500 ease-out
                    group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Gradient + title revealed on hover */}
            <div
                className='pointer-events-none absolute inset-x-0 bottom-0 p-4
                    bg-gradient-to-t from-black/85 via-black/35 to-transparent
                    opacity-0 translate-y-2 transition-all duration-300 ease-out
                    group-hover:opacity-100 group-hover:translate-y-0'
            >
                <h2 className='text-white font-semibold text-sm md:text-base leading-snug line-clamp-2 drop-shadow'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}
