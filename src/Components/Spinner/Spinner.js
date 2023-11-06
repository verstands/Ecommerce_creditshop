import React from 'react'

const Spinner = () => {
    return (
        <div className="flex mt-3 items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mr-2"></div>
        </div>
    )
}

export default Spinner