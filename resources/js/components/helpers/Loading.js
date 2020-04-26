import React from 'react';


export default function Loading({title}) {
    return (
        <div>
            <h4>{title}</h4>
            <img 
                style={{ width: 40,
                marginTop: 30 }} 
                src='storage/uploads/loading-arrow.gif' 
                alt='loading gif'
            />
        </div>
    )
}
