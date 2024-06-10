import React, { forwardRef, useId } from 'react'

function Select({
    options,
    label,
    className = '',
    ...props
}, ref) {

    const id = useId()

    return (
        <div className='w-full'>
            {label &&
                <label htmlFor={id} className=''>{label}</label>}
            <select {...props} id={id} ref={ref}
                className={`w-full px-3 py-2 outline-none bg-slate-600 focus:opacity-95 text-white duration-200 border border-gray-400 ${className}`}>
                {
                    // options.length > 0  OR we can do
                    options?.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    )
}

// One way of using forwardRef is in Input comp. 
// This is Another way (easy way :)
export default forwardRef(Select)
