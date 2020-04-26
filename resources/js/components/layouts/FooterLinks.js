import React from 'react'

export default function FooterLinks({title, link1, link2, link3, link4}) {
    return (
        <div>
            <aside className='justify-content-center d-flex flex-column align-items-left'>
                <h5>{title}</h5>
                <a className='p-1'>{link1}</a>
                <a className='p-1'>{link2}</a>
                <a className='p-1'>{link3}</a>
                <a className='p-1'>{link4}</a>
            </aside>
        </div>
    )
}
