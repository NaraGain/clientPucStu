import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionAction } from '../redux/questionSlice';
import axios from 'axios';
import { message } from 'antd';
import axiosInstance from '../api';
import { Link, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const File = ()=> {
  const [data ,setData] = useState([])
  const dispatch = useDispatch()
  const question = useSelector(state => state.question.subject)
  const report = useSelector(state => state.question.report)
  const cookie = new Cookies()
  
  const handleBeforeUnload = (event)=>{
    localStorage.setItem('questionStorage',JSON.stringify(question))
    event.preventDefault()
    console.log("page is about to reload" ,question)
    event.returnValue = JSON.stringify(question)
  }

  const getExam = async () =>{
      try {
        const response = await getExam({
          examId : "655a2e3ff415db945a451ac5"
        })
        console.log(response)
        if(response.success){
          dispatch(questionAction.addQuestion({question : response.result}))
          message.success('fetch data')
        }else{
          message.error(response.message)
        }
      } catch (error) {
        message.error(error)
      }
  }

  console.log(question)
  console.log(report)
  useEffect(()=> {
    if(question.length == 0){
        axios.post(`${process.env.REACT_APP_API_KEY}student/question`, {
          examId : "655a2e3ff415db945a451ac5"
        }).then((response)=> 
        { 
          message.success(response.data.message)
          dispatch(questionAction.addQuestion({question : response.data.result}))
          setData(response.data.result)
        })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }

  }, [])
 


  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
      <Outlet/>
      <ul className='grid grid-cols-3 gap-1'>
      {
        
      question?.map((i ,key)=><li className='bg-purple-100 p-4 active:bg-yellow-50 cursor-pointer rounded-md' key={key}>
      <Link to ={`/file/render?name=${i.title}&question`}>{i.title} {i.progress}</Link>
        </li>
        
        )
      }
      </ul>
      
    </div>
  );
};

