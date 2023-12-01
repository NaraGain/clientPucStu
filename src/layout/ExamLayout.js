import React, { useState } from "react";
import Container from "../components/Container";
import { Outlet, Link, useParams } from "react-router-dom";
import Timer from "../components/Timer";
import Avatar from "../components/Avatar";
import Cookie from "universal-cookie"
import { Dropdown, Space, Pagination  } from 'antd';
import Icon from "../components/Icon";
import { CiCircleChevLeft,CiExport, CiRuler, CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { loadingAction } from "../redux/loaderSlice";
import NavigatorButton from "../components/NavigatorButton";

const cookies = new Cookie()

export function ExamLayout(){
    const [change , setChange] = useState(false)
    const names = useParams()
    const username = cookies.get('studentname')
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(1);

 
  
const onChange = (page) => {
        setCurrent(page);
        };
  const mousDown = () =>{
   setChange(true)
  }

  const mousUp = () =>{
    setTimeout(()=>{
        setChange(false)
    }, 1000)
   
  }


    return <>
        <header className="m-0 top-0 bg-variation-500 text-white bg-repeat bg-auto 
        shadow-sm shadow-neutral-200 fixed w-full z-10">
        <div className="relative  px-2 md:top-0 
        md:py-3 py-4 m-0  text-slate-900 flex justify-between md:items-center 
        tracking-wider "> 
        <span className="flex items-center gap-3 cursor-pointer">
            {
                change ? 
                    <div onMouseUp={mousUp}>
                    <NavigatorButton>
                     <Icon name={<CiCircleChevLeft/>} Size={"1.2rem"}/>
                     </NavigatorButton>
                    </div>
                 :   <img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src="./asset/Puc_logo.png" alt="logo"/>
            }
            <h1>PUC_Exam</h1>
        </span>
  {
     names.name  ?<div className="overflow-hidden md:block"> </div> : null
  }
        <div className="flex space-x-1 items-center">
            <Timer ></Timer>
            <>
            <AvatarUser/>
        </>
        </div>
      </div>
        </header>
        <div className="top-0  relative w-full ">
        <Outlet/>
        </div>
           
    
        
        
 </>




}
export const AvatarUser = () => {
    const dispatch = useDispatch()
    const username = cookies.get('studentname')
    const logout = (e) =>{
        cookies.remove("STUDENTTOKEN",{path : "/"})
        cookies.remove('studentname')
        dispatch(loadingAction.ShowLoading())
        window.location.href= "/login"
        dispatch(loadingAction.HideLoading())
    }
    const items = [
    {
        key : '1',
        label: (
        <a className=" flex gap-3 items-center" onClick={logout}>
            <Icon Size="1rem" name={<CiExport/>}>    
            </Icon>
            Log out</a>
        
        )
    }
        ]
    return <>
    <Dropdown menu={{items}}>
            <Space>
            <Avatar name={username}/>
            </Space>
        </Dropdown>
    </>
}