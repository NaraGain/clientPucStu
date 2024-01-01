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
     items-center w-full h-screen">      
      <div className="rounded-xl 
          max-w-xl md:mx-auto px-4 py-7
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
              <div className="flex justify-center">
              <Icon Size={"5rem"}
              color={"#0f3460"}
               name={<CiViewTimeline/>}></Icon>
              </div>
                <h2 className="text-[18px] text-center md:text-[24px] tracking-wide
       font-bold text-gray-800 2xl:text-[28px]">
    Examinations Rule</h2>
       
       <span>
       <span>
    <ul className="pl-5 grid
      py-1.5 mt-3 ">
    {
      <> {examRule.map((i,index)=><li key={i.id} 
      className=" flex items-center cursor-pointer ">
         <div className=" text-center bg-purple-100 rounded-full flex justify-center
          font-semibold items-center w-7 h-7">
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
        <div className="p-[0.1px] bg-gray-600"></div>
    <div className="flex justify-center mt-4 px-4 ">

    <button onClick={()=> {dispatch(showAction.hideShow())
    } }
     className="rounded-full  px-5 py-1.5  text-[14px] md:text-[14px] font-sans
     cursor-pointer bg-variation-500 text-white tracking-wide font-semibold
      active:bg-variation-400 active:shadow-none">
          Got it!
       </button>
    </div>
              </>
            }
     
  
    </div>
      
</section>
}