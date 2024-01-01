import {message } from "antd";
import React, { useEffect, useState } from "react";
import {useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import Icon from "../../components/Icon";
import { Groups } from "../../api/exam";
import moment from "moment"
import {  FcFaq} from "react-icons/fc";
import { loadingAction } from "../../redux/loaderSlice";
import { ExamBox } from "./componets/examBox";


export default function Main () {

    const [data ,setData] = useState()
    const [exam ,setExam] = useState([])
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
        if(response.success){
          setData(response.result)
          setExam(response.result.exam)
          const findExamId = response.result.exam.find((i)=>
           moment(i.date).format('LL') == moment(currentDate).format('LL'))
        }else{
          message.error(response.message)
        }
      } catch (error) {
        message.error(error)
      }
    } 

   


    useEffect(()=> {
        handleOnGet()
    },[location.search])



    return <div className="flex bg-login flex-col  text-gray-600 items-center
     justify-center w-full md:overflow-hidden h-screen font-roboto">
            <div className="space-y-2 px-3  ">
              <div className="flex justify-center">
              <Icon Size={"4rem"} name={<FcFaq/>}>
              </Icon>
              </div>
             
            <h1 className="text-center text-[24px] ">
              Greeting {cookie.get('studentname')}</h1>
             <div className="flex justify-center gap-2 flex-col items-center">
              <div className="flex items-center gap-2">
              <p className="text-center text-[18px]">{data?.group} {data?.class}
              </p>
              </div>
              <p className="text-center break-words ">
              Following specific instructions provided by the invigilators or 
              examiners, including how to mark answers
            </p>
            
            <p className="text-center break-words sm:block ">
             required to maintain silence and refrain from communicating with 
            other students during exams.
            </p>
             </div>          
            </div>
            <ExamBox group={data?.time} exam={exam} currentDate={currentDate}/>
    </div>
}



