
import React, {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Welcome from "./component/Welcome"
import { QuizCard } from "./component/QuizCard"

import { useLocation, useSearchParams } from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css'
import axios from "axios"
import { loadingAction } from "../../redux/loaderSlice"
import { getQuiz, questionAction } from "../../redux/questionSlice"
import { Button, message } from "antd"
import { reportAction } from "../../redux/reportSlice"
import Cookies from "universal-cookie"


export default function Exam (){

const dispatch = useDispatch()
const loadding = useSelector(state => state.show.isShow)
const subject = useSelector(state => state.question.subject)
const reportsQueston = useSelector(state => state.question.report)
const report = useSelector(state => state.report)
const examId = useLocation()
const userId = useSelector(state => state.auth.userId)
const cookie = new Cookies()

console.log(subject)

const onGetExam = async (e)=>{
  dispatch(loadingAction.ShowLoading())
  dispatch(getQuiz({id : examId.state}))
  dispatch(loadingAction.HideLoading())
}

const handleSubmitReport = async () => {
  await axios.post(`${process.env.REACT_APP_API_KEY}report/add`,
   report).then((res)=> {
   message.success("upload report")
  }).catch(error => {
    message.error(error.response.data.message)
  })
}

useEffect(()=>{
  dispatch(loadingAction.ShowLoading())
  onGetExam()
  dispatch(loadingAction.HideLoading())
  dispatch(reportAction.addReportToDb({
    user : userId,
    exam : examId.state,
    result : reportsQueston, 
  }))
  Aos.init({duration:500})
},[dispatch])



return <>
    <div  className=" bg-neutral-50 
    h-screen flex flex-col">
    {
      loadding ? (
        <>
   <div className="container mx-auto  
   relative  py-2 md:py-5 ">
    <div className="flex text-[24px] items-center gap-1 pb-2 2xl:mt-[7rem] mt-[4rem]">
      <h1 className=" font-roboto">Hello</h1>
     <button className="md:mx-0 border-none text-[24px]  mx-3" 
     onClick={handleSubmitReport}>{cookie.get('studentname')}</button>
    </div>
    
     <p className="font-thin text-[14px] text-gray-600 mx-3 lg:mx-0 tracking-wider">
      ✨ Please the choose name subject before continue</p>
  <div data-aos="fade-in" className="grid md:grid-cols-3 grid-cols-2 pt-[1.5rem] lg:gap-7
  gap-2 md:mx-0 mx-3 md:mt-0 mt-1 ">
    {
      subject.map((i , k)=>
       <QuizCard key={k} id={i._id} title={i.title}
        number={i.question.length}
        link={i.title}
        desc={i.score}></QuizCard>)
    }
  </div>
    </div>     
</>

  ): (<Welcome/>)
    } 
 </div>


 
</>
}


