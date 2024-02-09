import {message } from "antd";
import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import Icon from "../../components/Icon";
import { Groups } from "../../api/exam";
import { CgCopy } from "react-icons/cg";
import { loadingAction } from "../../redux/loaderSlice";
import { ExamBox } from "./componets/examBox";


export default function Main () {

    const [data ,setData] = useState()
    const [exam ,setExam] = useState([])
    const [student ,setStudent] = useState([])
    const location = useLocation()
    const group = new URLSearchParams(location.search)
    const name = group.get('group')
    const [currentDate , setCurrentDate] = useState(new Date())
    const cookie = new Cookies()
    const dispatch = useDispatch()
    const course = atob(name)

    // get Groups by course name function
    const handleOnGet = async ()=>{
      try {
        dispatch(loadingAction.ShowLoading())
        const response = await Groups({
          courseName : course
        })
        dispatch(loadingAction.HideLoading())
        console.log(response)
        if(response.success){
          setData(response.result)
          setExam(response.exam)
          setStudent(response.student)
        }else{
          message.error(response.message)
        }
      } catch (error) {
        message.error(error)
      }
    } 

   


    useEffect(()=> {
        handleOnGet()
        cookie.set('course', data?._id)
    },[location.search , data?._id])



    return <div className="overflow-y-auto">
       <div className="flex bg-login flex-col p-5  text-gray-600 items-center
     justify-center w-full md:overflow-hidden h-screen font-roboto">
            <div className="space-y-2 px-3  ">
              <div className="flex justify-center">
                <div className="bg-gradient-to-r from-sky-400 to-cyan-300
                 w-[4rem] h-[4rem] 2xl:w-[6rem] 2xl:h-[6rem] 
                p-4 rounded-full">
                <Icon color={"#ffff"}  name={<CgCopy/>}/>
                </div>
              
              </div>
             
            <h1 className="text-center text-[24px] ">
              Greeting {cookie.get('studentname')}</h1>
             <div className="flex justify-center gap-2 flex-col items-center">
              <div className="flex items-center gap-2">
              <p className="text-center font-sans text-[18px]">Welcome to class {data?.group} {data?.class}
              </p>
              </div>
             </div>          
            </div>
            <ExamBox group={data?.time} exam={exam} currentDate={currentDate}/>
    </div>
    </div>
}



