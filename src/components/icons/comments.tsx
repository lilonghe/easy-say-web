import React from 'react';

export default function favorites(props: any) {
    const { width='1.2em', height='1.2em', color} = props;
    return <svg className="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="6876" width={width} height={height}>
        <path
            fill={color}
            d="M810.667 213.333a64 64 0 0 1 64 64V704a64 64 0 0 1-64 64H478.336l-146.645 96.107a21.333 21.333 0 0 1-33.024-17.856V768h-85.334a64 64 0 0 1-64-64V277.333a64 64 0 0 1 64-64h597.334z m0 64H213.333V704h149.334v63.296L459.243 704h351.424V277.333z m-271.36 213.334v64h-176.64v-64h176.64z m122.026-128v64H362.667v-64h298.666z"
            p-id="6877"></path>
    </svg>
}