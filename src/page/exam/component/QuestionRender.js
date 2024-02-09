import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import { questionAction } from "../../../redux/questionSlice";
import { Button, Form, Input, Result, FloatButton, Tooltip } from "antd";
import Writing from "../../../components/Writing";
import Instruction from "../../../components/Instruction";
import { RenderFile } from "./RenderFile";
import Icon from "../../../components/Icon";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";



export  const QuestionRender = () =>{
  const [form] =  Form.useForm()
  const location = useLocation()
  const navigator = useNavigate()
  const [check ,setChecked] = useState(false)
  const dispatch = useDispatch()
  const searchParams = new URLSearchParams(location.search)
  const name = searchParams.get('name')
  const questions = useSelector(state =>
  state.question.subject?.find((i => i.title == name )))
 const [intputvalue ,setInputValue] = useState({ })
 const [currentQuestion ,setCurrentQuestion] = useState(0)
 const [previous , setPrevious] = useState(false)
 const [collapsed , setCollapsed] = useState(false)
 const [answerBtn , setAnswer] = useState(false)
 const [result , setResult] = useState(false)



 //handle Fill question have been complete function
const handeFillForm = (value)=> {
  if(questions?.progress !== 0){
    form.setFieldsValue(questions?.question[currentQuestion]?.userAnswer)
  }else{
    form.setFieldsValue('')
  }
  form.setFieldsValue(value)
}


// handle caculate fill in blank question is correct anwer is match in blank
// mark point is will plus one for in box
const getAnswer = (value, qid, title , correctAnswer)=>{
  // alert(`Form submitted for item ${qid}:`)
  let markPointOfEachBox = 0
  for(let key in correctAnswer[0]){
    if(value[key].toLowerCase() === correctAnswer[0][key].toLowerCase()){
        markPointOfEachBox++
    }
  }
  //dispacth data into redux quetsionslice
  dispatch(questionAction.handleChangeBlank({
    title : title,
    qid   : qid,
    answer : value,
    markPoint : markPointOfEachBox
  }))
}


//replace  text with input function
const replaceWordWithInput = (replace, word, qid, title, answer)=> {
  let count = 0
  const sentence = word.split(' ')
  return (<div className="text-[16px] leading-4" > { sentence.map((word, index)=>{
    const cleanWord = word.replace(/[.,]/g, '');
    if(replace.includes(cleanWord)){
      count+=1
      return (
        <span className="inline-flex ">
        <Form.Item name={`blank${count}`}>
        <Input 
        autoSave
        maxLength={cleanWord.length}
        value={intputvalue[`blank${count}`] || ' '}
         className={`border w-[10rem]`} 
        type="text"
        />
        </Form.Item>
        </span>
      )
    }else{
      return <span className="leading-8"> {word} </span>
    }
  }) } </div>)
}
//replace  text with input function

//next button function//
const handleAnswerNext = ()=>{
  const nextQuestion = currentQuestion + 1
  if(nextQuestion < questions?.question.length){
    setCurrentQuestion(nextQuestion)
    setPrevious(true)
  }else{
    setResult(true)
  }
}
// pervious button function
const handleAnswerPrev = () =>{
  const nextQuestion = currentQuestion - 1
  if(nextQuestion < questions?.question.length){
    setCurrentQuestion(nextQuestion)
    setAnswer(false)
    form.resetFields()
  }else {
    setPrevious(false)
  }
  if(nextQuestion < 1){
    setPrevious(false)
  }
}

//navigate button click question//
const handleNavigate = (key) => {
  setCurrentQuestion(key)
}

// toggleCollapsed function
const handletoggleCollapsed = ()=>{
  setCollapsed(!collapsed)
}

//calutatemark on mqc question fucntion//
const calulateScore = (name , answer, questionPoint, isChecked, correctAnswer,value)=>{
   let Point = 0
    if(name === "Blank"){

    }else if (name === "Mqc"){ 
        if(answer && isChecked){  
          if(correctAnswer.indexOf(value) !== -1){
            Point = questionPoint
          }
        }else if(answer && !isChecked){
          Point = questionPoint - questionPoint
        }
    }
    return Point
}

// caculate total socre all question score function
const toalPoints = () => {
      let Total = 0
    const number = questions.question
    .map((itmes,key)=> itmes.markPoint)
    Total = number.reduce((a , b) => a+b)
    return Total
}

// provice status function to each section stauts
const statusSection = (fullScore) =>{
    console.log(fullScore , toalPoints())
    let status = ""
    let point = toalPoints()
    let result =  fullScore / 2
    if(point <= result){
      status = "FAILED"
    }else{
      status = "PASS"
    }
    return status
}

//prevent user reload page 
const handleBeforeUnload = (event)=>{
  event.preventDefault()
 (event || window.event).return = "Are you sure you want to leave this page?"
}


useEffect(()=> {
  const type = searchParams.get('question')
  handeFillForm()

  window.addEventListener('beforeunload',handleBeforeUnload)
  return () => window.removeEventListener('beforeunload', handleBeforeUnload)
}, [location.search, handeFillForm])

  return <div className="flex flex-col lg:flex-row w-full h-screen font-roboto">
          {
            questions ? <>
    <div className={`${collapsed ? "w-0 transition-transform duration-100 ease-out" 
    : "lg:w-1/5 2xl:w-[20%]"} bg-white lg:bg-neutral-50 mt-0 overflow-y-auto`}>
      <div className=" mt-[3.5rem] lg:flex justify-between">
    <p className="hidden text-start  px-4 
    py-1 shadow-sm text-[12px]
    bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white  
    lg:inline-flex rounded-full m-2 font-sans tracking-wide">Question List</p>
    <button 
    onClick={handletoggleCollapsed}
    className={ collapsed ? "fixed p-2 shadow-md bg-neutral-100"
     :` px-2 m-2 py-1 rounded-full
     bg-gradient-to-br from-cyan-400 via-cyan-500 text-[12px]
      to-cyan-600 flex justify-center items-center text-white `}>
      <Icon Size={"1.3rem"} name={ collapsed ? 
      <CiCircleChevRight/> : <CiCircleChevLeft/>}  />
      </button>
      </div>
      <ul className="mt-[4.5rem]   overflow-x-auto lg:mt-0 lg:flex-col flex justify-center">
    {
    questions?.question.map((items, key)=>{
      return (
        <li  className="turncate cursor-pointer my-1 inline-flex lg:flex ">
          <button onClick={()=>handleNavigate(key)} className={`${items?._id 
          === questions?.question[currentQuestion]?._id ? "bg-white lg:border-l-[2px] lg:border-cyan-400  font-sans text-gray-600" 
          : "bg-neutral-50"}
           w-full rounded-full lg:rounded-none truncate py-0 lg:py-2 mx-2 px-2
          md:shadow-none  inline-flex font-roboto items-center text-[16px]`}>{key + 1}
           <p className="hidden md:block w-full truncate text-start"> . 
            {
              questions.question[currentQuestion].name === "writing" && "Choose the topic"
            }
            {
              questions.question[currentQuestion].name 
              === "Blank" ? <>{name}</> : <> {items.question}</>
            }     
        </p>
          </button>
       </li>
      )
      })
      }
      </ul>   
    </div>

  {/* task area */}
    <div className="lg:w-[75%] bg-white flex-1 flex flex-col lg:mt-[3.5rem]">
      {
        result ? <div className="flex-1 flex-col h-screen 
                                 items-center w-full">
                   <Result
                  className="font-sans mt-4"
                  status={"success"}
                  title={"click button for go home page"}
                  subTitle={`please review your answer
                   before do next section`}
                  extra={
                    <div className="flex gap-3 font-roboto justify-center">
                    <Button 
                    className="rounded-full bg-gradient-to-br
                     from-yellow-200
                      via-yellow-300
                       to-yellow-400" 
                    onClick={()=> {
                      handleAnswerNext()
                      setResult(false)
                    }
                      }>previous</Button>
                    <Button className="bg-gradient-to-br
                     from-cyan-400 via-cyan-500 
                     to-cyan-600 text-white rounded-full" 
                     onClick={()=>{
                      navigator(-1 ,{replace : true})
                      dispatch(questionAction.addReport({
                       markPoint : toalPoints(),
                       subjectName : name,
                       sectionScore : questions?.score,
                       status : statusSection(questions?.score)
                        
                      }))
                      
                      }}>next section</Button>
                    </div>
                  }/> </div> : <>
<div className=" flex-1 overflow-y-auto ">
<div className="md:max-w-[80%] px-4 md:px-0 mx-auto">
<Instruction headers={name}></Instruction>
<div className="">
<p className="my-3 text-[14px] inline-flex
text-yellow-700 
border border-yellow-300
 bg-yellow-100 rounded-full px-2 py-1.5 ">
  Desc : {questions.question[currentQuestion]?.description}</p>  
  <p className="my-3 mx-1 text-[14px] border-green-500 bg-green-100 border text-green-500
   rounded-full inline-flex px-2 py-1.5">
  {questions.question[currentQuestion]?.point}pt</p>
  </div>
  <>
  {
      questions.question[currentQuestion].name === "writing" && <>
      <h1 className="text-[18px] text-gray-600 font-semibold">Choose the Topic below</h1>
        <ul className="text-gray-600">
          {
          questions.question[currentQuestion]?.options?.map((items,key)=> {
            return (
              <li>
              {key + 1} . {items.value}
              </li>
            )
          })}
          </ul>
      <Writing score={questions?.score} answer={questions.question[currentQuestion]?.userAnswer} 
      qid={questions.question[currentQuestion]._id}/>
      </>
        }
      {/* blank question */}
        {
          questions.question[currentQuestion].name === "Blank" && <>
          <ul className="flex flex-wrap-reverse gap-2 my-4 text-gray-600">
          {
          questions.question[currentQuestion]?.options?.map((items,key)=> {
            return (
              <li className="text-[16px] bg-white px-2 
              rounded-full py-1.5 border border-gray-300">
              {key+1}. {items}
              </li>
            )
          })}
          </ul>
          {/* {JSON.stringify(questions.question[currentQuestion].correctAnswer)} */}
          <div className="bg-gray-300 p-[0.5px]"></div>
          <Form className="mt-5" form={form} onFinish={(value)=> getAnswer(value ,
             questions.question[currentQuestion]._id , name)} >
            {replaceWordWithInput(questions.question[currentQuestion]?.options, 
            questions.question[currentQuestion].question,
             questions.question[currentQuestion]?._id )}
          </Form>
          {/* {JSON.stringify(questions.question[currentQuestion]?.userAnswer)} */}
          </>
        }   
        </>
          {/* Blank question */}
          {/* MQC question */}
        <div>
          {
            questions.question[currentQuestion].name === "Mqc" && <>
              <div>
             {questions.question[currentQuestion]?.upload && <>
             <RenderFile 
                 type={questions.question[currentQuestion].upload?.type}
               path={questions.question[currentQuestion].upload?.path}
               />
              </>}

         </div>
            <div className="bg-neutral-50  text-gray-600 p-4 mb-2 rounded-lg shadow-sm">
             <p className="text-[18px] text-gray-700 font-semibold">
              {currentQuestion+1}.
              {questions.question[currentQuestion].question}</p>
             <ul className="my-5 ">
              {
                questions.question[currentQuestion]?.options?.
                map((items, key)=><li className="my-5" key={key}>
                  <label className="flex">
                    <input className="w-5 h-5 mx-3 text-[16px]"
                     checked={items.isSelect}
                      onChange={(e)=> {
                      setChecked(!check)
                      dispatch(questionAction.handleCheckBox({
                        qid : questions.question[currentQuestion]._id,
                        title : name,
                        value : items?.value,
                        isChecked : check,
                        currentMarkPoint : calulateScore(questions?.question[currentQuestion].name , 
                          items.isCorrect,
                          questions?.question[currentQuestion].point,
                          e.target.checked,
                          questions?.question[currentQuestion]?.correctAnswer,
                          items?.value
                          )
                      }))
                      
                    }} type="checkbox"></input>
                   {key + 1} . {items.value}
                  </label>
                </li>)
              }
             </ul>
             </div>
            </>
          }
        </div>
     </div>

   </div>
   {/* next and previus button */}
   {
    questions?.question[currentQuestion]?.name === "writing" ? <></> :
     <div className="bg-white border-neutral-50 flex justify-center  py-4 gap-3">
     {
      previous ? <Button 
      className="bg-gradient-to-br from-yellow-200
       via-yellow-300 to-yellow-400 rounded-full" onClick={
        handleAnswerPrev
      
      }>previous</Button> : <></>
     }
     {
      questions.question[currentQuestion].name == "Blank" ?<> { 
          answerBtn ?  <Button
          className=" rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white"
          onClick={()=>{
          form.resetFields()
          setAnswer(false)
          handleAnswerNext(questions.question[currentQuestion]._id)}}>Next</Button>
         :<Button
         className="rounded-full bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white"
         onClick={(value)=>{
          getAnswer(form.getFieldValue(), questions.question[currentQuestion]._id, name,
           questions?.question[currentQuestion]?.correctAnswer)
          setAnswer(true)
         }}>Answer</Button> 
        
       } </> :  <Button
       className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white rounded-full"
       onClick={handleAnswerNext}>Next</Button> 
     }
     </div>
}
     </>
}     
    </div>
                 
            </>  
                  
            : <div className="flex w-full   justify-center items-center">
           <Result
           status="500"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button
                  className="bg-rose-500 rounded-full text-white"
                  onClick={()=> navigator(-1 , {replace:true})}
          >Back Home</Button>}
            />
            </div> 
          }

   
  
  
  
  </div>
}