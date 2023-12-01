import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import { Button, Result } from 'antd';
import { FcDisapprove, FcHighPriority, FcRemoveImage } from "react-icons/fc";
import Icon from "./Icon";

export default function ErrorPage({type}){
	document.title = "404 - not found page"
  let navigator = useNavigate()
  const handleNavigator = () => {
    navigator(-1, {replace:true})
  }

    return <div className="flex justify-center items-start h-screen inset-0">
    <Result
    title="404"
    icon={<Icon Size={"15rem"} name={<FcHighPriority/>}></Icon>}
    subTitle="Sorry, the page you visited does not exist."
    extra={<button
      onClick={()=> handleNavigator()}
      className="px-8 inline py-2 text-sm font-medium leading-5
       shadow text-white transition-colors duration-150 border
        border-transparent rounded-md border-1 tracking-wide focus:outline-none focus:shadow-outline-blue
         bg-variation-500 active:bg-variation-400 hover:bg-purple-700">Back</button>}
  />

    </div> 
                   


}




