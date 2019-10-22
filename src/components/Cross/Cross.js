import React from 'react'
import './Cross.css'

function Cross({onClick}) {
    return (
        <div onClick={onClick} className={'cross'}>
            <svg id="Layer_1" data-name="Layer 1"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
                <polygon
                    points="512 86.78 425.22 0 256 169.22 86.78 0 0 86.78 169.22 256 0 425.22 86.78 512 256 342.78 425.22 511.99 512 425.22 342.78 256 512 86.78"
                    fill="#5b5b5f"/>
            </svg>
        </div>
    )
}

export default Cross
