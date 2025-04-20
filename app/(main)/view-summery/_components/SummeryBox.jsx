import React from 'react'
import ReactMarkdown from 'react-markdown'

function SummeryBox({ summery }) {
    return (
        <div className='h-[60vh] overflow-auto'>
            <ReactMarkdown className='text-base/8'>{summery}</ReactMarkdown>
        </div>
    )
}

export default SummeryBox