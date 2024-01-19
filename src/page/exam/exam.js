import React, {  useEffect} from "react"
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


export default function Exam (){
const dispatch = useDispatch()
const loadding = useSelector(state => state.show.isShow)
const question = useSelector(state => state.question.subject)
const reportsQueston = useSelector(state => state.question.report)
const report = useSelector(state => state.report)
const location = useLocation()
const exam = new URLSearchParams(location.search)
const examId = exam.get('id')
const cookie = new Cookies()
const userId = cookie.get('stuId')
const courseId = cookie.get('course')

console.log(report)
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
      //start random options question
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
      loadding ? (
        <>
   <div className="container mx-auto  
   relative md:px-4  py-2 md:py-5 ">
    <div className="flex text-[24px] text-variation-500 mx-3 
    lg:mx-0 items-center gap-1 pb-2 2xl:mt-[7rem] mt-[5rem]">
      <h1 className=" font-roboto">Section Question</h1>
    </div>
    
     <p className="text-[14px] text-gray-600 mx-3 lg:mx-0 tracking-wider">
      ✨ Please the choose section name before continue</p>
  <div className="grid md:grid-cols-3 grid-cols-2 pt-[1.5rem] lg:gap-7
  gap-2 md:mx-0 mx-3 md:mt-0 mt-1 ">
    {
      question?.map((i , k)=>
       <QuizCard key={k} id={i._id} title={i.title}
        number={i.question.length}
        link={i.title}
        progress={i. progress}
        desc={i.score}></QuizCard>)
    }
  </div>
    </div>     
</>

  ): (<Welcome/>)
    }   
        </> : <></>
      }
 </div>
</>
}


