import React from "react";
import Icon from "../Icon";
import { RiFacebookCircleLine, RiInstagramLine, RiMailLine, RiTelegramLine, } from "react-icons/ri"
import { Link } from "react-router-dom";

const file = [{"icon": <RiFacebookCircleLine/>},
 {"icon": <RiTelegramLine/>}, {"icon":<RiMailLine/>},{"icon": <RiInstagramLine/>}]
const quickLink = [  { "name" : "Home",     "link" : "/home"  },
                    {  "name" : "Who We Are",     "link" : "/about" },
                     {   "name" : "Our Philosophy","link" : "/about" }]
const TalkWithus = [  { "name" : "Contact us",     "link" : "/contact"  },
                     {  "name" : "Get in Touch",     "link" : "/contact" },
                      {   "name" : "Get Help","link" : "/contact" }]                     

export default function Footer(){
    return (
        <footer className=" tracking-wider footer-bg bg-gray-50  px-0 md:mt-8  mt-2 font-sans ">
        <div className=" px-6 py-12 container boder-[1px]  text-black mx-auto ">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                <div className="sm:col-span-2">
                    <div className="justify-between space-y-2">
                    <h1 className="max-w-lg text-xl
                     font-semibold tracking-tight
                       xl:text-2xl dark:text-white"></h1>
                <a href="#" className="flex  items-center space-x-2">
                    <img className="w-auto h-10 rounded" 
                    src="/PUC_Logo.png" alt="Puc-logo"/>
                   <p className="font-bold text-[18px] font-roboto">Puc Takhamu</p> 
                </a>
                <div className="flex space-x-3 py-4">
                    {
                        file.map(item=><Icon name={item.icon} Size="2rem" color="purple"></Icon>)
                    }
                </div>
                <div>
                <p class="text-[18px] text-black-600">© Copyright 2023. All Rights Reserved.</p>
                </div>
            </div>
                </div>
    
                <div>
                    <p className="font-semibold text-[16px]  dark:text-white  tracking-wider">Quick Link</p>
                    <div className="flex flex-col items-start mt-5 space-y-2">
                        {quickLink.map(item =><Link to={item.link}>
                            <a className=" text-md transition-colors duration-300 dark:text-gray-300
                         dark:hover:text-blue-400 hover:underline hover:text-gray-500">{item.name}</a>
                        </Link>)}
                    </div>
                </div>
    
                <div>
                    <p className="font-semibold text-[16px]  dark:text-white">Talk With Us</p>
                    <div className="flex flex-col items-start mt-5 space-y-2">
                        {TalkWithus.map(item =><Link to={item.link}>
                       <a className=" transition-colors
                        duration-300 text-md
                         dark:text-gray-300 dark:hover:text-blue-400 hover:underline
                          hover:text-gray-500">{item.name}</a>  
                       </Link>  )}
                       
                       
                         
                    </div>
                </div>
            </div>
                    
           
        </div>
    </footer>
    )
        
}

