import React, {  useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import Welcome from "./component/Welcome"
import { QuizCard } from "./component/QuizCard"
import { useLocation} from "react-router-dom"
import Aos from "aos"
import 'aos/dist/aos.css'
import { questionAction } from "../../redux/questionSlice"
import {message } from "antd"
import { reportAction } from "../../redux/reportSlice"
import Cookies from "universal-cookie"
import { getExam } from "../../api/exam"
import { loadingAction } from "../../redux/loaderSlice"
import HeaderBar from "./component/HeaderBar"


export default function Exam (){
const dispatch = useDispatch()
const loadding = useSelector(state => state.show.isShow)
const question = useSelector(state => state.question.subject)
const reportsQueston = useSelector(state => state.question.report)
const report = useSelector(state => state.report)
const location = useLocation()
const exam = new URLSearchParams(location.search)
const [title ,setTitle] = useState('')
const examId = exam.get('id')
const cookie = new Cookies()
const userId = cookie.get('stuId')
const courseId = cookie.get('course')


// function api getGetExam

//function random question of options
const shuffleArray = (array)=> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//getExam function//
const onGetExam = async (e)=>{
  try {
    dispatch(loadingAction.ShowLoading())
    const response = await getExam({
      examId : examId
    })
    dispatch(loadingAction.HideLoading())
    if(response.success){
      setTitle(response.title)
      const randomizedData = response.result.map((exam) => ({
        ...exam,
        question: exam.question.map((q)=> {
          if(q.name === 'Mqc'){
            return {
              ...q,
              options : 
              shuffleArray(q.options.map((options)=> ({...options})))
            }
          }else{
            return {
              ...q,
            }
          }
        })
      }));
      //dispatch into redux state (questionslice) //
      dispatch(questionAction
        .addQuestion({question : randomizedData}))
    }else{
      message.error(response.message)
    }
  } catch (error) {
    message.error(error)
  }
}

const handleBeforeUnload = (event) => {
  event.preventDefault()
}


useEffect(()=>{
  if(userId === undefined || examId === undefined) {
   message.warning("Mesiss something please login agin")
  }
  if(question.length === 0){
    onGetExam()
  }
 
  dispatch(reportAction.addReportToDb({
    user : userId,
    exam : examId,
    course : courseId,
    result : reportsQueston, 
  }))
  Aos.init({duration:500})
  window.addEventListener('beforeunload', handleBeforeUnload)
  return () => window
  .removeEventListener('beforeunload', handleBeforeUnload)
},[location.search])



return <>
    <div  className=" bg-neutral-50 
    h-screen flex flex-col">
      {
        question ? <>
          {
   <>
    <HeaderBar title={title} render={loadding}/>
    <div className="container mx-auto md:py-0 ">
      {
        loadding ?
  <div className="grid md:grid-cols-3 grid-cols-2 pt-[1.5rem] lg:gap-7
  gap-2 md:mx-0 mx-3 md:mt-0 my-2 2xl:mt-4 ">
    {
      question?.map((i , k)=>
       <QuizCard key={k} id={i._id} title={i.title}
        number={i.question.length}
        link={i.title}
        progress={i. progress}
        desc={i.score}></QuizCard>)
    }
  </div> : <Welcome/>
}
  </div>
    </>     
    }   
        </> : <></>
      }
 </div>
</>
}


