import React from "react"

export const VocabularyCard = ({src}) =>{
    return  <div className=" font-roboto pb-8 px-3 font-normal
     bg-white md:bg-neutral-50 md:border-none border-neutral-200 border-[1px]
         text-center md:text-base
     text-[12px] mb-4  rounded-md">
        <ul className="flex flex-wrap">
      {src.map((i,index)=><li key={index} 
                  className="">
      <p draggable="true" className="px-3 py-1.5 m-2 flex  
       rounded-md cursor-pointer border-[1px] border-neutral-200 
        bg-neutral-50">{i}</p>
        </li>)}</ul>
    </div>
}