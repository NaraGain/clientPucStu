import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams ,Link, useSearchParams, useLocation} from "react-router-dom";
import ExamStatus from "./ExamStaute";
import { Button, Checkbox, Result, message ,Layout, Menu, theme, Space } from 'antd';
import axios from "axios";
import NavigatorButton from "../../../components/NavigatorButton";
import { loadingAction } from "../../../redux/loaderSlice";
import FillBlanks from "../../../components/FillBlank";
import { VocabularyCard } from "../../../components/VocabularyCard";
import Writing from "../../../components/Writing";
import { getQuestionAsync, questionAction } from "../../../redux/questionSlice";
import { RenderFile } from "./RenderFile";

export const QuestionRender = ({showScore}) => {
  const {name , id } = useParams()
  const test = useParams()
  const dispatch = useDispatch()
  const navigator = useNavigate()
  const [currentQuestion ,setCurrentQuestion] = useState(0)
  const [previous, setPrevious] = useState(false);
  const [show,setShow] = useState(false)
  const [load, setLoad] = useState(false);
  const [checked ,setChecked] = useState(false)
  const [examId ,setExamId] = useState()
  const [newData , setNewData] = useState([])
  const [markPoint ,setMarkPoint] = useState(0)
  const [searchParams, setSearchParams] = useSearchParams();
  const subId = useLocation()
  const questions = useSelector(state =>state.question.subject)
  const queryQuestion = useSelector(state => state.question.questions)
  const reading = useSelector(state => state.question.reading)
  const userId = useSelector(state => state.auth.userId)
  const point = useSelector(state => state.question.markPoint)
  const [collapsed, setCollapsed] = useState(false);
  const [data ,setData] = useState([])
  const {
    token: { colorBgContainer },
  } = theme.useToken(); 

const getQuestion = async ()=>{
  await axios.get(`${process.env.REACT_APP_API_KEY}quiz/${subId.state.id}`).then(res=>{
    dispatch(loadingAction.ShowLoading())
    setExamId(res.data.quizs.ExamId)
    setData(res.data.quizs.question)
    dispatch(loadingAction.HideLoading())
  })
}

useEffect(()=>{
  dispatch(loadingAction.ShowLoading())
  dispatch(getQuestionAsync({sub_id : subId.state.id}))
  getQuestion()
  dispatch(loadingAction.HideLoading())
},[dispatch])



const handleAnswerNext = () => {
  const nextQuestion = currentQuestion + 1
  if(nextQuestion < data.length){
    setPrevious(true)
    setCurrentQuestion(nextQuestion)
  }else{
    setShow(true)
  }

}

  const handleAnswerOptionClickPrev = () => {
    const nextQuestion = currentQuestion - 1;
    if (nextQuestion < data.length) {
      setTimeout(()=>{
        setLoad(true)
        setCurrentQuestion(nextQuestion)
        setTimeout(()=>{setLoad(false)},[600])
      },90) 
    }else{
      setShow(false)
    }
    if( nextQuestion < 1){
      setPrevious(false)
    }
  }

  const handlenavigtor = (key) => {
      setCurrentQuestion(key)
  }

  const caculatePoint =(currentQuizPoint) =>{
      let status = ''
      let result = currentQuizPoint / 2 
      if(point <= result){
        status = 'failed'
      }else{
        status = 'pass'
      }

      return status

  }

  const hanndleChecek = (value ,qId, correctAns) => {
    setChecked(!checked)
    console.log(value ,qId)
    const quizTest = data.find(questionId =>  questionId._id == qId)
    console.log(quizTest)
    let checkeds = quizTest.options.find(i => i.value == value)
    checkeds.isSelect = checked
    if(correctAns){
      setMarkPoint(markPoint => markPoint += 1)
      dispatch(questionAction.countMarkPoint({markPoint : markPoint}))
    }else{
      setMarkPoint(markPoint)
    }

  }


 
return <>
    {
     data.length > 0 ? <>
      <div className="flex flex-col lg:flex-row w-full h-screen">
        {/* <!-- User List --> */}
        <div className="lg:w-1/5 md:block hidden bg-white mt-0 lg:mt-[4rem] overflow-y-auto">
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-4 px-4">Queston index</h2>
            
                <ul>
                  {
                    data.map((item ,key)=>
                    <li   onClick={()=> {
                      handlenavigtor(key)
                    }}
                     className={`flex items-center p-3 cursor-pointer
                     ${item._id === data[currentQuestion]._id ?
                       "bg-neutral-50" : ""}
                     space-x-3 mb-2 rounded-md`}>
                        <span className="truncate">{name + " question"} {key+1} </span>
                    </li>)
                  }
                </ul>
            </div>
        </div>
        {/* <!-- Chat Area --> */}
        <div className="lg:w-[75%]  flex-1 md:mt-[4rem] 2xl:mt-[7rem] mt-[6rem] 
         border-l border-neutral-200
         bg-neutral-50 flex flex-col">
            {/* <!-- Chat Header --> */}
            {/* <!-- question form --> */}
            <div className="flex-1 overflow-y-auto  md:p-4">
                {/* <!-- question --> */}
  
                  {
                    // final question
                    show ? <Result
                    subTitle={`${name} student ${userId} examId ${examId} Score ${point}`}
                    title={"click button for go home page"}
                    status = "success"
                    extra={
                      <div className="flex gap-3 justify-center">
                      <Button onClick={()=> {
                        handleAnswerNext()
                        setShow(false)
                      }
                        }>previous</Button>
                      <Button onClick={()=>{
                        navigator(-1)
                        dispatch(questionAction.addReport({
                        markPoint : point,
                         subjectName : name,
                         status : caculatePoint(subId.state.score)
                          
                        }))
                        
                        }}>Go back</Button>
                      </div>
                     
                    }
                    /> :
                    // task box
                    <div className="max-w-4xl 2xl:max-w-6xl 
                    2xl:h-[40rem] md:h-[28rem] overflow-y-auto
                     mx-auto py-4 px-5 lg:bg-white lg:border-[1px] border-neutral-200 lg:rounded-lg  ">
                      {
                        data[currentQuestion].name == "writing" ? <>
                        <p className="text-[16px] md:text-[20px]">
                          {data[currentQuestion].description}</p>
                        <ul className="space-y-3 mx-4">
                          {data[currentQuestion].options.map((item ,key)=><li
                           className="break-words list-decimal"
                           key={key}>
                            {item.value}
                          </li>)}
                        </ul>
                        <>
                        <Writing e_id={examId} user_id={userId} />
                        </>
                    
                        </> : <div>
                        {
                      data[currentQuestion].name === 'Blank' ? <>
                      <VocabularyCard src={data[currentQuestion].options}/>
                      </>  
                      :<p className="md:text-[20px] text-[18px] break-words">
                        {currentQuestion + 1 }. 
                       {data[currentQuestion].question}</p> 
                    }
                     <p className="text-[16px] py-2 text-gray-600 break-words">✨
                      {data[currentQuestion].description ? data[currentQuestion].description 
                      : "be carefull for select Answer"}</p>
                     {
                      data[currentQuestion].upload ? 
                      <><RenderFile type={data[currentQuestion].upload.type} 
                      path={data[currentQuestion].upload.path}/> </> : <></>
                     }             
                      {
                        data[currentQuestion].options.map((item , key)=> <div key={key}>
                          {
                            data[currentQuestion].name === "Mqc" ? <ul className="">
                              <li className="bg-white rounded-md p-3 my-3  mx-2 
                              ">
                                <label className="gap-2 flex items-center cursor-pointer">
                                <input className="w-5 h-5" type="checkbox" 
                                 checked={item.isSelect}
                                 onChange={()=> {hanndleChecek(item.value 
                                  ,data[currentQuestion]._id , 
                                item.isCorrect)}} key={item.length + 1}
                                 value={item.value}/>
                                  {item.value}</label>
                              </li>
                            </ul> : <></>
                          }
                        </div>
                        )
                      }
                      <>
                      {
                            data[currentQuestion].name === "Blank" ? 
                              <>
                             <FillBlanks
                             mark={markPoint}
                              correctAnswers={data[currentQuestion].correctAnswer}
                               regExps={data[currentQuestion].options} 
                             sentence={data[currentQuestion].question}
                             questionId={data[currentQuestion]._id}
                             />
                              </>
                             : null
                          }
                      </>
                        </div>
                      }

                    </div>
                  }
                    {/* <!-- Sample Messages --> */}
                  
                    {/* <!-- More messages... --> */}           
            </div>
            {/* <!-- next buuton -->*/}
            {
              show ? <></> : 
            
            <div className="bg-white p-4 border-t border-neutral-200">
                <div className="flex gap-3 justify-center">
                    {
                    previous ?  <Button 
                    className="w-[5rem]
                    py-2 
                    rounded-full " 
                    onClick={handleAnswerOptionClickPrev} 
                  >previous</Button> : <></>
                  }
                    <Button onClick={handleAnswerNext} className="
                    bg-variation-500 w-[5rem] 
                    rounded-full
                     text-white">
                      next</Button>  
                </div>
            </div>
}
            {/* buttonnext */}
        </div>
    </div>
      
      </>
 : <div className="top-[6rem] relative">
 <Result
     status="warning"
    title="No question aviliable"
    subTitle= {`${subId.state.id}`}
    extra={
      <NavigatorButton style="bg-variation-400 text-white rounded-full">
        Back
        </NavigatorButton>
    }
  />
 </div> 
}      
</>




}


