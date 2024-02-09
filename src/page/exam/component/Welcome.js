import React,{useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { examRule } from "../../../data/data";
import { showAction } from "../../../redux/ShowScore";
import { Button, Form, Input } from "antd";
import Icon from "../../../components/Icon";
import {  CiViewTimeline } from "react-icons/ci";
import Aos from "aos"
import 'aos/dist/aos.css'


export default function Welcome (){
    const dispatch = useDispatch()
    const isShow = useSelector(state => state.show.isShow)
    const [form] = Form.useForm()
    const key = true


    useEffect(()=>{
        Aos.init({duration : 5000})
    }, [])
  
    return  <section data-aos="fade-down" 
    className="flex  flex-col font-roboto justify-center
     items-center w-full">      
      <div className="rounded-xl 
          max-w-xl md:mx-auto px-4 py-2 2xl:py-7
           ">
            {
              !key ? <>
                      <Form layout="vertical" form={form}>
                        <Form.Item className="w-full" 
                        name={"key"} label="Please insert key">
                          <Input/>
                        </Form.Item>
                        <Form.Item htmlFor="submit" >
                          <Button>submit</Button>
                        </Form.Item>
                      </Form>
              </> : <>
       <span>
       <span>
    <ul className="pl-5 grid
      py-1.5 mt-3 ">
    {
      <> {examRule.map((i,index)=><li key={i.id} 
      className=" flex items-center cursor-pointer ">
         <div className=" text-center 
         bg-gradient-to-br from-yellow-200
         via-yellow-300 to-yellow-400 rounded-full
         flex justify-center
         items-center w-7 h-7">
            <p className="text-[16px] p-4 text-variation-500">{index+1}</p>
         </div>
      
         <p className="2xl:text-[16px] text-sm md:text-[16px] 
          text-slate-800 my-2 2xl:my-3 md:mx-4 mx-2 font-sans">
            {i.text}
            </p>  
         
         </li>)}</>
   
    }
    </ul>
    </span>      
        </span>
        <div className="p-[0.1px] border-t border-gray-300 border-dashed "></div>
    <div className="flex justify-center mt-4 px-4 ">

    <button onClick={()=> {dispatch(showAction.hideShow())
    } }
     className="px-5 py-1.5  text-[14px] md:text-[14px] font-sans
     cursor-pointer bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 rounded-full
       text-white tracking-wide 
      active:bg-[#175093] active:shadow-none">
          Got it!
       </button>
    </div>
              </>
            }
     
  
    </div>
      
</section>
}