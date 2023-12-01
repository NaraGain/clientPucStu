
import React, { useEffect, useState } from "react";


export default function Alert ({info, desc, children}){
const [hidden,setHidden] = useState(false)

const checkoutInfo = (infos) =>{
  infos = info.toLowerCase()
  if(infos === "danger"){return "bg-red-50 text-rend-800"}
  if( infos === "warning"){return "bg-yellow-50 text-yellow-800" }
  if(infos === "info"){return "bg-blue-50 dark:bg-gray-800 text-blue-400"}
  if(infos === "success"){return "text-green-800 bg-green-50"}
  if(infos === "dark"){ return "text-gray-800  bg-gray-50"}
}

    return <>
    { desc ? (  <div  className={ hidden ? "hidden" : `flex items-center p-3 mb-4 rounded-lg
    ${checkoutInfo(info)}
     dark:bg-gray-800 ` } role="alert">
   📛
    <div className="ml-3 text-sm font-sm">
    {desc}
   
    </div>
    <div className="ml-3 text-sm font-sm">
    {children}
    </div>
   
    <button onClick={
      ()=>setHidden(!hidden)
    } type="button" className={`ml-auto -mx-1.5 -my-1.5 ${checkoutInfo(info)}
     text-red-500 border-none rounded-lg focus:ring-2
      focus:ring-red-400 p-1.5
     hover:bg-red-200 inline-flex h-8 w-8 dark:bg-gray-800
      dark:text-red-400 dark:hover:bg-gray-700`} 
      data-dismiss-target="#alert-2" aria-label="Close">
      <span className="sr-only">Close</span>
      <svg className="w-5 h-5"
       fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 
           0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293
            4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path></svg>
    </button>
  </div>

    ):(
      <></>
    )

    }
    
    </>
    
  
}