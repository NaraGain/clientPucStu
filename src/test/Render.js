import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useLocation, useNavigate } from "react-router-dom";
import questionSlice, { questionAction } from "../redux/questionSlice";
import { Button, Form, Input, Result } from "antd";
import Writing from "../components/Writing";
import Instruction from "../components/Instruction";
import { RenderFile } from "../page/exam/component/RenderFile";
import NavigatorButton from "../components/NavigatorButton";


export  const Render = () =>{
  const {TextArea} = Input
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
 const userAnswers = useSelector(state => state.question.userAnswer)
 const [currentQuestion ,setCurrentQuestion] = useState(0)
 const [previous , setPrevious] = useState(false)
 const [collapsed , setCollapsed] = useState(false)
 const [answerBtn , setAnswer] = useState(false)
 const [result , setResult] = useState(false)
 const [emptyForm , setEmptyForm] = useState(false)
 const [caculateSocre , setCaculateScore]= useState(0)
 const [point ,setPoint] = useState(0)
 const markPoint = useSelector(state => state.question.markPoint)
 const [checkItem ,setCheckItems] = useState([])
 const report = useSelector(state => state.question.report)


const handeFillForm = (value)=> {
  if(questions?.progress !== 0){
    form.setFieldsValue(questions?.question[currentQuestion]?.userAnswer)
  }else{
    form.setFieldsValue('')
  }
  form.setFieldsValue(value)
}


const handleSubmit = (value , qid ,title) => {
  alert(JSON.stringify(value) + qid + title)
  dispatch(questionAction.handleChangeBlank({
    qid : qid,
    title : title,
    answer : value
  }))
}
const getAnswer = (value, qid, title , correctAnswer)=>{
  // alert(`Form submitted for item ${qid}:`)
  let markPointOfEachBox = 0
  for(let key in correctAnswer[0]){
    if(value[key].toLowerCase() === correctAnswer[0][key].toLowerCase()){
        markPointOfEachBox++
    }
  }
  console.log(markPointOfEachBox)
  dispatch(questionAction.handleChangeBlank({
    title : title,
    qid   : qid,
    answer : value,
    markPoint : markPointOfEachBox
  }))
}

const handleWriting = (qid , title , answer) =>{
    return <> 
    <Form form={form} onFinish={(value)=>handleSubmit(value, qid, title)}>
      <Form.Item name={'blank'}>
        <TextArea/>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Submit</Button>
        </Form.Item>
    </Form>
    </>
}

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
        maxLength={cleanWord.length}
        value={intputvalue[`blank${count}`] || ' '}
         className={`border`} 
        type="text"
        />
        </Form.Item>
        </span>
      )
    }else{
      return <span> {word} </span>
    }
  }) } </div>)
}

const handleAnswerNext = ()=>{
  const nextQuestion = currentQuestion + 1
  if(nextQuestion < questions?.question.length){
    setCurrentQuestion(nextQuestion)
    setPrevious(true)
  }else{
    setResult(true)
  }
}

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

const handleNavigate = (key) => {
  setCurrentQuestion(key)
}

const handletoggleCollapsed = ()=>{
  setCollapsed(!collapsed)
}

const calulateScore = (name , answer, questionPoint, isChecked, correctAnswer, value)=>{
   let Point = 0
   console.log(correctAnswer , value)
  if(correctAnswer.indexOf(value) !== -1){
    console.log('count queston point' ,questionPoint)
     Point = questionPoint
  }else{
    Point = questionPoint - 1
  
  }
   if (name === "Mqc"){ 
        if(answer && isChecked){ 
          if(correctAnswer.indexOf(value) !== -1){
            Point = questionPoint
          } 
        }else if (answer && !isChecked){
           Point = questionPoint - questionPoint
        }
    }
    return parseInt(Point)
}

const toalPoints = () => {
      let Total = 0
    const number = questions.question.map((itmes,key)=> itmes.markPoint)
    Total = number.reduce((a , b) => a+b)
    return Total
}

const statusSection = (fullScore) =>{
    console.log(fullScore , toalPoints())
    let status = ""
    let point = toalPoints()
    let result =  fullScore / 2
    if(point <= result){
      status = "failed"
    }else{
      status = "pass"
    }
    return status
}

useEffect(()=> {
  const type = searchParams.get('question')
  handeFillForm()
}, [location.search, handeFillForm])

  return <div className="flex flex-col lg:flex-row w-full h-screen font-roboto">
          {
            questions ? <>
              <Button className="md:block hidden fixed bg-neutral-200 z-10" 
     onClick={handletoggleCollapsed}>
      { collapsed ? ">":"<"}</Button>
    <div className={`${collapsed ? "w-0 transition-transform duration-100 ease-out" 
    : "lg:w-1/5 2xl:w-[20%]"}  bg-white mt-0 overflow-y-auto`}>
      <div className="bg-purple-100 lg:block hidden transition-transform duration-500 ease-in-out">
    <p className="hidden overflow-x-auto py-2 mx-[3rem] lg:block">Exam Detail {questions.progress}</p>
      </div>
      <ul>
    {
    questions?.question.map((items, key)=>{
      return (
        <li  className="turncate cursor-pointer inline-flex lg:flex justify-center">
          <Button onClick={()=>handleNavigate(key)} className={`${items?._id 
          === questions?.question[currentQuestion]?._id ? "bg-green-50 font-semibold text-gray-600" 
          : "bg-white"}
           border-[1px] py-0 lg:py-5 mx-2 my-2
          md:shadow-none md:border-none inline-flex font-roboto items-center text-[16px]`}>{key + 1}
           <p className="hidden md:block truncate w-44 2xl:w-52"> . 
            {
              questions.question[currentQuestion].name === "writing" && "Choose the topic"
            }
            {
              questions.question[currentQuestion].name 
              === "Blank" ? <>{name}</> : <> {items.question}</>
            }
         
        </p>
          </Button>
       </li>
      )
      })
      }
      </ul>
      
    </div>

  {/* task area */}
    <div className="lg:w-[75%] flex-1 flex flex-col ">
      {
        result ? <Result
                  className="font-roboto mt-4"
                  status={"success"}
                  title={"click button for go home page"}
                  subTitle={`please review your answer
                   before do next section`}
                  extra={
                    <div className="flex gap-3 font-roboto justify-center">
                    <Button className="bg-purple-100
                     border-variation-400 rounded-full
                      border-[1px]" onClick={()=> {
                      handleAnswerNext()
                      setResult(false)
                    }
                      }>Previous</Button>
                    <Button className="bg-yellow-50
                     border-yellow-400 rounded-full border-[1px]" 
                     onClick={()=>{
                      navigator(-1 ,{replace : true})
                      dispatch(questionAction.addReport({
                       markPoint : toalPoints(),
                       subjectName : name,
                       status : statusSection(questions.score)
                        
                      }))
                      
                      }}>Go to Exam</Button>
                    </div>
                   
                  }
        
        /> : <>
<div className=" flex-1 overflow-y-auto ">
<div className="md:max-w-[80%] px-4 md:px-0 mx-auto">
<Instruction headers={name}></Instruction>
<p className="mx-3 bg-rose-50 rounded-full px-2 py-1.5 inline-flex">
  Point : {questions.question[currentQuestion].point}</p>
  <p className="mx-3 bg-rose-50 rounded-full px-2 py-1.5 inline-flex">
  answer Point : {questions?.question[currentQuestion]?.markPoint}</p>
  <p className="mx-3 bg-rose-50 rounded-full px-2 py-1.5 inline-flex">
  Total Point : {toalPoints()}</p>
<p className="text-[14px] text-gray-600 mx-3 mb-3 inline-flex">
  {questions?.question[currentQuestion]?.description}</p>
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
      <Writing answer={questions.question[currentQuestion]?.userAnswer} 
      qid={questions.question[currentQuestion]._id}/>
      </>
        }
      {/* blank question */}
        {
          questions.question[currentQuestion].name === "Blank" && <>
          <ul className="flex gap-2 my-4 text-gray-600">
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
          {JSON.stringify(questions.question[currentQuestion].correctAnswer)}
          <div className="bg-gray-300 p-[0.5px]"></div>
          <Form className="mt-5" form={form} onFinish={(value)=> getAnswer(value ,
             questions.question[currentQuestion]._id , name)} >
            {replaceWordWithInput(questions.question[currentQuestion]?.options, 
            questions.question[currentQuestion].question,
             questions.question[currentQuestion]?._id )}
          </Form>
          {JSON.stringify(questions.question[currentQuestion]?.userAnswer)}
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
            <div className="bg-white text-gray-600 p-4 mb-2 rounded-lg shadow-sm">
             <p className="text-[18px] font-semibold">
              {currentQuestion+1}.
              {questions.question[currentQuestion].question}</p>
             <ul className="my-5 ">
              {
                questions.question[currentQuestion]?.options?.
                map((items, key)=><li className="my-5" key={key}>
                  <label className="flex items-center gap-2">
                    <input class="w-5 h-5 text-blue-600 bg-gray-100 mx-4 border-gray-300
                     rounded-md focus:ring-variation-400
                    dark:ring-offset-gray-800 focus:ring-1 "
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
                          e.target.checked, questions?.question[currentQuestion]?.correctAnswer,
                          items?.value
                          )
                      }))
                      
                    }} type="checkbox"></input>
                    {items.value} {JSON.stringify(items.isCorrect)} {items.isSelect}
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
      previous ? <Button className="bg-yellow-300" onClick={
        handleAnswerPrev
      
      }>previous</Button> : <></>
     }
     {
      questions.question[currentQuestion].name == "Blank" ?<> { 
          answerBtn ?  <Button onClick={()=>{
          form.resetFields()
          setAnswer(false)
          handleAnswerNext(questions.question[currentQuestion]._id)}}>Next</Button>
         :<Button onClick={(value)=>{
          getAnswer(form.getFieldValue(), questions.question[currentQuestion]._id, name,
           questions?.question[currentQuestion]?.correctAnswer)
          setAnswer(true)
         }}>Answer</Button> 
        
       } </> :  <Button  
       onClick={handleAnswerNext}>Next</Button> 
     }
     </div>
}
     </>
}     
    </div>                  
            </>            
            
            : <div className="flex flex-col w-full h-screen justify-center items-center">
           <Result
           status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={<Button
                  className="bg-variation-500 text-white"
                  onClick={()=> window.location.href = "/file"}
          >Back Home</Button>}
            />
            </div> 
          }

   
  
  
  
  </div>
}