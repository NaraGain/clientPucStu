import React, { useState } from "react";
import Container from "../components/Container";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
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
    const path = useLocation()
    const username = cookies.get('studentname')
    const dispatch = useDispatch()
    const [current, setCurrent] = useState(1);

 

  const mousDown = () =>{
   setChange(true)
  }

  const mousUp = () =>{
    setTimeout(()=>{
        setChange(false)
    }, 1000)
   
  }

  console.log(path)


    return <>
        <nav className="m-0  top-0 bg-variation-500 text-white bg-repeat bg-auto 
        shadow-sm shadow-neutral-200 fixed w-full z-10">
        <div className="relative  px-4 md:top-0 
        md:py-3 py-4 m-0  text-slate-900 flex justify-between md:items-center 
        tracking-wider "> 
        <span className="flex items-center gap-3 cursor-pointer">
            {
                path.pathname === "/exam"  || names.name ? <>
                 {
                change ? <div onMouseUp={mousUp}>
                    <NavigatorButton style={"rounded-full px-2 bg-white"}>
                     <Icon color={"black"} name={<CiCircleChevLeft/>} Size={"1.2rem"}/>
                     </NavigatorButton>
                    </div>
                 :   <img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src="./asset/Puc_logo.png" alt="logo"/>
            }
                </> :<img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src="./asset/Puc_logo.png" alt="logo"/>
        } 
            <h1 className="font-semibold text-[18px]">Oxam</h1>
        </span>
            {
             names.name  ?<div className="overflow-hidden md:block"> </div> : null
            }
        <div className="flex space-x-1 items-center">
            {
                path.pathname === "/exam" || names.name ? <Timer></Timer> :<></>
            }
            <>
            <AvatarUser/>
        </>
        </div>
      </div>
        </nav>
        <main className="top-0  relative w-full ">
        <Outlet/>
        </main>
           
    
        
        
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
    <Dropdown className="cursor-pointer" menu={{items}}>
            <Space className="cursor-pointer">
            <Avatar name={username}/>
            </Space>
        </Dropdown>
    </>
}