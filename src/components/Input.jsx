import React, { forwardRef, useId } from 'react'

const Input = forwardRef(({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) => {
    const id = useId()

    return (
        <div className='w-full'>
            {
                label &&
                <label className='inline-block pl-1 mb-1' htmlFor={id}>
                    {label}
                </label>
            }
            <input type={type} className={`w-full px-3 py-2 outline-none bg-slate-600 focus:opacity-95 text-white duration-200 border border-gray-400 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})

export default Input