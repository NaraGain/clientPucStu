
import React, { useState } from "react";
import { BiCircle,BiX,  } from "react-icons/bi";
import {MdZoomOut, MdZoomOutMap} from "react-icons/md"
import Icon from "./Icon";


const Modal = ({showModals, description,children,info,text,event ,size, type }) => {
    const [showModal, setShowModal] = useState(false);
   
const handleSize = (size) => {
  if (size === "large"){
    return "max-w-5xl"
  }else if (size === "meduim"){
    return "max-w-4xl"

  }else {
    return "max-w-xl"
  }
}



    return (
      <>{
        showModals ? 
        <button
        className={type === "image" ? modalStyle.mainBtnImage 
        : modalStyle.mainBtnText}
        type="button"
        onClick={() => setShowModal(true)}
      >
        {
          
          type === "image" ?
          <div className="bg-blue-100 2xl:h-[15rem] h-[9rem]  w-full  ">
          <img className="w-full h-full  object-cover" src={text}/>
          <div className="w-6 h-6 shadow-md shadow-gray-400/10 -top-[1rem]  relative 
           bg-gray-200 rounded-full p-1 ">
          <Icon name={<MdZoomOutMap/>} color="purple" />
          </div>
          
          </div>
          : <p>
            {text}
          </p>
        }
      </button>
        : <></>
      }
      
        {showModal ? (
          <>

            <div className="fixed top-0 left-0 right-0 z-50 w-full overflow-x-hidden
             overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full
                            flex justify-center items-cente outline-none focus:outline-none">
            <div className="relative w-auto md:my-4 top-20 md:mx-auto">
              <div className="rounded-xl  relative flex flex-col w-full
               bg-white outline-none focus:outline-none">
              <div className={`relative w-full h-full ${handleSize(size)} md:h-auto`}>
        <div className="relative ">
            <button 
            onClick={()=>setShowModal(false)}
            type="button" className="absolute md:top-3 right-4 top-4  md:right-2.5 text-gray-400
             bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full bg-purple-100 
             text-sm p-1.5 ml-auto inline-flex items-center
            " data-modal-hide="popup-modal">
                <div className="w-4 h-4 flex justify-center items-center">
                  <Icon name={<BiX/>} Size="1.2rem" color="purple"/>
                </div>
            </button>
            <div className="p-4">
                <div className="">
                  {children}
                </div>
                 {
                  info ? (
                    <>

                    </>
                  ):(
                    <div className="flex items-center justify-center mt-4">
                      <button onClick={event}
                type="button" className="rounded relative inline-flex group items-center
                 hover:border-purple-200
                 justify-center px-4 w-32 py-2 m-1 cursor-pointer bg-purple-800 text-white
                  active:bg-purple-600 active:shadow-none
                ">
                    Yes, I'm sure
                </button>
                <button onClick={()=>setTimeout(()=>{
                      setShowModal(false)
                },[200])} data-modal-hide="popup-modal" type="button" 
                className="rounded relative inline-flex group items-center
                hover:border-purple-200
                 justify-center px-4 w-32 py-2 m-1 cursor-pointer bg-purple-100 text-purple-800
                  active:bg-purple-200 active:shadow-none">No, cancel</button>
                    </div>
                  )
                 }
              
            </div>
        </div>
    </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  };


const modalStyle = {
  "main" : "",
  "mainBtnText" : "rounded-xl border-1  inline-flex group items-center"
  +"hover:border-purple-200 "
  +"justify-center px-4  py-2 m-1 cursor-pointer bg-gray-100 text-gray-600"+
   "active:bg-gray-200 active:shadow-none",
  "mainBtnImage": "rounded-xl border-1 w-full inline-flex group items-center"+
  "hover:border-purple-200 border-[1px] border-gray-200 hover:contrast-50 "+
  "justify-center  py-2  mt-3 cursor-pointer bg-gray-100 text-gray-600"+
   "active:bg-gray-200 active:shadow-none",

};

  
  export default Modal;
  