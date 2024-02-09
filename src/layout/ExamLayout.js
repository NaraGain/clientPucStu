import React, { useState } from "react";
import { Outlet,  useParams, useLocation, Link } from "react-router-dom";
import Timer from "../components/Timer";
import Avatar from "../components/Avatar";
import Cookie from "universal-cookie"
import { Dropdown, Space,  } from 'antd';
import Icon from "../components/Icon";
import {CiExport} from "react-icons/ci";
import {MdOutlineFrontHand} from "react-icons/md"
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
        <nav className={`m-0  top-0 bg-white border-b border-neutral-200
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
                 className="w-[2.5rem] h-[2.5rem]" src={`${process.env.REACT_APP_API_KEY}`+"Puc_logo.png"} alt="logo"/>
            }
                </> :<img onMouseMove={mousDown} 
                 className="w-[2.5rem] h-[2.5rem]" src={`${process.env.REACT_APP_API_KEY}`+"Puc_logo.png"} alt="logo"/>
        } 
            <h1 className="font-semibold text-[16px] text-variation-500">Puc IFL</h1>
            <span className="text-base border-l border-gray-600 lg:block hidden">
            <ul className="flex gap-5 text-gray-600 mx-3">
                <li className="hover:underline">
                   <a>home</a>
                    </li>
                <li className="hover:underline">exam</li>
                <li className="hover:underline">
                   <a>classes</a>
                    </li>
                    <li className="hover:underline">
                   <a>profile</a>
                    </li>
            </ul> 
        </span>
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
        cookies.remove('course')
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
            <a className=" flex gap-3 items-center">
                <div className="
                p-1 
                 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full
                 text-white
                ">
                <Icon Size={"1rem"} name={<MdOutlineFrontHand/>}/>    
                </div>
              Hello {username}</a>
            
            )
        },
    {
        key : '10',
        label: (
        <a className=" flex gap-3 items-center" onClick={logout}>
            <div className=" p-1 
                 bg-gradient-to-br from-rose-400 via-rose-500 to-rose-600 rounded-full
                 text-white">
            <Icon Size="1rem" name={<CiExport/>}/> 
            </div>   
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