import React from "react";


const renderType = (type)=>{
  const types = type.toLowerCase()

  if(types === "password"){
    return "password"
  }else if(types === "radio"){
    return "radio"
  }else if ("checkbox") {
      return "checkbox"
  }else if (types === "submint"){
    return "submit"
  }else{
    return "text"
  }

}




export const Input =  ({id,Text, type ,event,name,value,checked, ref }) => {
    return <div >
    <div>
                            < input type={ type ? renderType(type) : "text"} onChange={event}
                              ref={ref}
                                value={value}
                                name="username" id="username"
                                className="ext-gray-900 rounded-md bg-gray-50 border-gray-200 border-[1px] 
                                text-sm block w-full py-2 text-[14px] font-normal md:py-3  px-2
                                 tracking-wider"
                                required="" />
                                {/* {formErrors.username && 
                                <p className="text-red-500 text-[12px] py-2 font-medium line-none">
                                    {formErrors.username}</p>} */}
                        </div> 
      
    </div>
 }

 const styleGroupInput = {
  "main": "flex items-center space-x-5 cursor-pointer w-full bg-gray-50 my-3 relative p-5 overflow-y-auto rounded-xl shadow-md shadow-gray-200/10",
  "inputStyle": "w-5 h-5 accent-purple-800 text-purple-700 bg-gray-100 border-gray-300 rounded"
  +"focus:ring-purple-700 focus:ring-2",
  "label-style": " ml-2  md:text-[16px] text-[14px] text-gray-900 indent-4 hover:text-gray-500",
}