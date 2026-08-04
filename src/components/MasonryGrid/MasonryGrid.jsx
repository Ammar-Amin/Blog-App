import React from 'react'

// Pinterest-style masonry via CSS multi-columns (no extra dependency).
// Cards flow top-to-bottom and pack into responsive columns. Each child
// card is responsible for `break-inside-avoid` + its own bottom margin.
export default function MasonryGrid({ children }) {
    return (
        <div className='columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4'>
            {children}
        </div>
    )
}
