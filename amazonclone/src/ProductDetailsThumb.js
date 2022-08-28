import React from 'react'

export default function ProductDetailsThumb({images, setIndex}) {
    return (
        <div className="thumb">
            {
                images.map((img, index)=>(
                    <img src={img} alt="" key={index} 
                    onClick={() => setIndex(index)} />
                ))
            }
        </div>
    )
}