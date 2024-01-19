import React from "react";



export default function Avatar({image , name, width , height}){

    return <>
    {
        image ?    <img className={`w-${width ? width :  10} h-${height ? height 
            : 10} rounded-full`} src={image} alt="Rounded avatar"/> :
        <div class="relative inline-flex items-center justify-center
         w-10 h-10 overflow-hidden bg-[#fef08a] text-variation-500 rounded-full ">
    <span class="font-medium text-gray-600 ">{name ?
     name.slice(0 ,2).toUpperCase() : null}</span>
</div>

    }
 
    </>    
}


