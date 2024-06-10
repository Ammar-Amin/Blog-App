import React from 'react'

export default function Button({
    text,
    type = 'button',
    bgColor = 'bg-blue-400',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button className={`px-6 py-2 ${textColor} ${bgColor} rounded-lg hover:opacity-95 ${className}`} {...props}>
            {text}
        </button>
    )
}

