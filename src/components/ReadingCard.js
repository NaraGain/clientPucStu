
import React, { useState,} from "react";
import Modal from "./Modal";
import {SmallSpinner} from "./load/SmallSpinner"

export function ReadingCard ({header,sentence,type}){
 const [open, setOpen] = useState(false)
 const [style,setStyle] = useState("")
 const [fullScreen ,setFullScreen] = useState(false)
const handleOnclick = () =>{
  setOpen(!open)
  setStyle('relative transition duration-150 ease-in-out order-first')

}


    return  <>
   {
    sentence ? <div className="">
    <p className="text-[16px] tracking-wide font-normal font-sans">
      Click on image to see full screen</p>
<Modal info={true} size="large" showModals={true} type="image" text={sentence}>
  <h1 className=" rounded-xl px-2  font-semibold py-1.5
    tex-center text-purple-800">Reading</h1>
    {sentence ? <img className="object-cover " src={sentence}/> 
    : <SmallSpinner></SmallSpinner>}
  
</Modal>

    </div> : <SmallSpinner/>
   }





 
    </>
} 