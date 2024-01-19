import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { questionAction } from '../redux/questionSlice';
import axios from 'axios';
import { message,  Button, Table  } from 'antd';
import axiosInstance from '../api';
import { Link, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';

export const File = ()=> {
  const [data ,setData] = useState([])
  const dispatch = useDispatch()
  const question = useSelector(state => state.question.subject)
  const report = useSelector(state => state.question.report)
  const cookie = new Cookies()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
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
          function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }   
          const randomizedData = response.result.map((exam) => ({
            ...exam,
            question: exam.question.map((q) => ({
              ...q,
              options: shuffleArray(q.options.map((option) => ({ ...option }))),
            })),
          }));
          dispatch(questionAction.addQuestion({question : randomizedData}))
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
          function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
              const j = Math.floor(Math.random() * (i + 1));
              [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
          }   
          const randomizedData = response.data.result.map((exam) => ({
            ...exam,
            question: exam.question.map((q)=> {
              if(q.name === 'Mqc'){
                return {
                  ...q,
                  options : shuffleArray(q.options.map((options)=> ({...options})))
                }
              }else{
                return {
                  ...q,
                }
              }
            })
          }));
          dispatch(questionAction.addQuestion({question :randomizedData}))
          setData(response.data.result)
        })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }

  }, [])
 
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];
  const items = [];
  for (let i = 0; i < 46; i++) {
    items.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
   
  
   
    <div className='flex flex-col h-screen items-center justify-center'>
      <Outlet/>
      <ul className='grid grid-cols-3 gap-1'>
      {
        
      question?.map((i ,key)=><li className='bg-purple-100 p-4 active:bg-yellow-50 cursor-pointer rounded-md' key={key}>
      <Link to ={`/file/render?name=${i.title}&question`}>{i.title} {i.progress}</Link>
        </li>
        
        )
      }
      </ul>
      <div>
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <span
          style={{
            marginLeft: 8,
          }}
        >
         
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={items} />
    </div>
    </div> 
          
    
  );
};

