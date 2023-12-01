import React, { useState } from "react"
import Contanier from "../../components/Container"
import { Card } from "../../components/Card"
import { BiAward} from "react-icons/bi"
import {FaUserGraduate }from "react-icons/fa"
import {FcUnlock, FcLock, FcAbout }from "react-icons/fc"
import { personalinfo } from "../../data/data"
import Alert from "../../components/Alerts"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Icon from "../../components/Icon"

function Profile({name}) {
 const IsLoggIn = useSelector((state => state.auth.isLoggIn))
 const navigate = useNavigate()
const [enable, setEnable] = useState(false)
 const handleExamLink = (e)=>{
   return IsLoggIn ? navigate("/exam") : alert("Please Login")
 }

 const handleEdite = (e)=> {
    setEnable(!enable)
  
 }

    return <> 
    {/* <Contanier>
      {
        personalinfo.map((value)=> value !== null ? <div>
        <div className="bg-gray-50 md:px-0 px-4">
        <div className="mx-auto container md:max-w-5xl py-10 flex flex-col 
        md:flex-row md:items-center">
          <div className="md:basis-1/2 basis-[0px] ">
        <div className="flex items-center space-x-4">
    <img class="md:w-32 md:h-32  w-20 h-20 
    rounded-full" src={value.picture} alt="profile"/>
    <div className="font-medium text-[18px] md:text-[28px] font-roboto ">
        <div>{value.fname} {value.lname}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{value.join}</div>
    </div>  
</div>
</div>
<div className="md:basis-1/2 basis-[0px]  justify-start flex md:justify-end ">
<div className="font-medium font-roboto  ">
  <div className="mt-5 pb-2 flex space-x-2 items-center md:mt-0">
  <Icon name={
    enable ? <FcUnlock/> : <FcLock/>
  } Size="1rem"/>
 <p>Description</p>
  
  </div>
  <form>
  {value.descritption.map((i)=>
 <div  contentEditable ={enable} className="text-sm text-gray-900 border-[1px] 
  border-gray-400 p-5 rounded font-normal 
   dark:text-gray-400 tracking-wide text-[16px]"><p>{i.desc}</p></div>
  )} 
  </form>
 
       <div className="flex space-x-2 mt-2">
<button onClick={handleEdite} className={buttonstyle.nextBtn}>Edit</button>
    <button onClick={handleExamLink} className={buttonstyle.grenBtn}>Examination</button>
   </div>
    </div>
</div>

   </div>
   
        </div> 
<div className="mx-auto container md:max-w-5xl tracking-wide md:py-10 md:px-0 px-4">
<div className="mt-5 border-b-[1px]  w-48 border-gray-500 md:mt-0 pb-2 font-medium flex 
space-x-2 items-center text-purple-900">
  <Icon name={<FcAbout/>} Size="1.2rem"/>
  <p>Personal Info</p></div>
    <div className="grid  md:grid-cols-4 grid-cols-2 md:gap-y-7 gap-y-3 gap-x-3 md:gap-x-20 px-2 py-5">
      {
        value.info.map((i)=><Card textSize="12px" title={i.title} desc={i.desc}
        icons={i.icon === "arc" ? <BiAward/> : <FaUserGraduate/>}/>)
      }
  

    </div>

   </div>
   
      </div> :
      <div className="p-2">
   <Alert info ="danger" desc="No data">
  <button className={buttonstyle.nextBtn}>Go Back</button>
   </Alert>
      </div>
   
 )
      }
     
    </Contanier> */}

    </>

}

  export default Profile