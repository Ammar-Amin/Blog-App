import React from 'react'

export default function Button({
    text,
    type = 'button',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button type={type} className={`px-6 py-2 ${textColor} ${bgColor} rounded-lg hover:opacity-90 ${className}`} {...props}>
            {text}
        </button>
    )
}

