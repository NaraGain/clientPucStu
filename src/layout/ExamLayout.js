import React, { useState } from "react";
import { Outlet,  useParams, useLocation } from "react-router-dom";
import Timer from "../components/Timer";
import Avatar from "../components/Avatar";
import Cookie from "universal-cookie"
import { Dropdown, Space,  } from 'antd';
import Icon from "../components/Icon";
import {CiExport,} from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch,  } from "react-redux";
import { loadingAction } from "../redux/loaderSlice";
import NavigatorButton from "../components/NavigatorButton";

const cookies = new Cookie()

export function ExamLayout(){
    const [change , setChange] = useState(false)
    const names = useParams()
    const path = useLocation()
    
  const mousDown = () =>{
   setChange(true)
  }

  const mousUp = () =>{
    setTimeout(()=>{
        setChange(false)
    }, 1000)
   
  }

    return <>
        <nav className={`m-0  top-0 bg-purple-100
         text-white bg-repeat bg-auto 
          fixed w-full z-10`}>
        <div className="relative  px-4 md:top-0 
        md:py-2 py-4 m-0  text-slate-900 flex justify-between md:items-center 
        tracking-wider "> 
        <span className="flex items-center gap-3 cursor-pointer">
            {
                path.pathname === "/exam"  || names.name ? <>
                 {
                change ? <div onMouseUp={mousUp}>
                    <NavigatorButton style={"rounded-md px-2 bg-none border-none shadow-none"}>
                     <Icon color={"black"} name={<IoIosArrowBack />} Size={"1.2rem"}/>
                     </NavigatorButton>
                    </div>
                 :   <img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src="./asset/Puc_logo.png" alt="logo"/>
            }
                </> :<img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src="./asset/Puc_logo.png" alt="logo"/>
        } 
            <h1 className="font-semibold text-[18px] text-variation-500">Oxam</h1>
        </span>
            {
             names.name  ?<div className="overflow-hidden md:block"> </div> : null
            }
        <div className="flex space-x-1 items-center">
            <Timer></Timer> 
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
        cookies.remove('stuId')
        localStorage.removeItem('attempts')
        localStorage.removeItem('questionStorage')
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