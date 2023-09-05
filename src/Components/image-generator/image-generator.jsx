import React from 'react';
import {useState,useRef} from 'react'
import './image-generator.css';
import default_image from './../../Assets/default_image.svg';
import Axios from 'axios';

//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
export const ImageGenerator = ()=>{
    const [url,setUrl]= useState('/');
    let inputRef= useRef('');
    const generateImg= async ()=>{
        if(inputRef.current.value !== ''){
           
            const response = await fetch("https://api.openai.com/v1/images/generations",
                {
                    method:"POST",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer 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',
                        "User-agent":"Chrome",  
                    },
                    body:JSON.stringify({
                        prompt:`${inputRef.current.value}`,
                        n: 1,
                        size: '512x512'  
                    }),
                }
            );
            let data=await response.json();
            let data_array=data.data;
            setUrl(data_array[0].url);

        }
        
    }
    return(
        <div className='container'>
            <h1 className="title">AI image <span>generator</span></h1>
            <div className="default-image">
                <img src={ url==='/' ? default_image : url} alt="" />
            </div>
            <div className="search-box">
                <input type="text" placeholder='Describe your image ...' ref={inputRef} />
                <button onClick={generateImg}>Generate</button>
            </div>

        </div>
    )
}