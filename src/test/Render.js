import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnswer } from "../redux/answerSlice";
import FillBlanks from "../components/FillBlank"



//get requestion
const api =[ 
  {
  "id" : "01",
  "type"   : 'mcq',
  "question" : 'what is a js?',
  "clude" : [
    {
      "id" : "01s2" , "title" : "car","selected" : false,
    },
    {
      "id" : "02s3" , "title" : " programming languaues","selected" : false
    }
  
  
  
  ],
  "completed" : false,
},
{
  "id" : "02",
  "type"   : 'mcq',
  "question" : 'what is a c?',
  "clude" : [
    {
      "id" : "01s1" , "title" : "programming languaues","selected" : false,
    },
    {
      "id" : "02s7" , "title" : "cartoon","selected" : false
    }
  
  ],
  "completed" : false,
},
{
  "id" : "03",
  "type"   : 'mcq',
  "completed" : false,
  "question" : 'what is a c++?',

   "clude" : [
    {
      "id" : "01q" , "title" : "food","selected" : false,
    },
    {
      "id" : "02zdw" , "title" : "cartoon","selected" : false
    },
    {
      "id" : "01s1r" , "title" : "programming languaues","selected" : false,
    },
   ]
},
{
  "id" : "04",
  "completed" : false,
  "type"   : 'blank',
  "question" : 'what is a < c++?',
  "answer" : null,
   "clude" : [
    {
      "id" : "01q" , "title" : "food","value" : null,
    },
    {
      "id" : "02zdw" , "title" : "cartoon","value" : null
    },
    {
      "id" : "03zds" , "title" : "monkey","value" : null
    }
   ]
},



]

const page = api.slice(0,1)


export  const Render = () =>{

  const answer = useSelector((state)=> state.answer)
  const dispatch = useDispatch()
  const [task ,setTask] = useState({})
  const [currentQuestion ,setCurrentQuestion] = useState(0) 
  const [showScore ,setShowSocre] = useState(false)
  const [checked ,setChecked] = useState(false)
  const [change ,setChange] = useState('')

  const handlecheckAns = (id, qid) => {
    setChecked(!checked)
    const apiQuiz = api.find(x => x.id === qid)
    apiQuiz.clude.find(i => i.id == id).selected = checked
    console.log(id)
    console.log(apiQuiz.clude.find(j => j.id == id).selected)
  //  setChecked(!checked)
  }

  const handlenext = () => {
     const nextquestion = currentQuestion+1
     setCurrentQuestion(nextquestion)
     if(nextquestion < api.length){
      setCurrentQuestion(nextquestion)
     }else{
      setCurrentQuestion(0)
      setTimeout(()=>setShowSocre(true), [400])
     }
  }


  const handleChange = (e) => {
      return 
  }


  return <div className="max-w-5xl mx-auto rounded-xl
                         border-[1px] mt-9 p-4 border-blue-200">
    {/* {
      showScore ? <div className="flex flex-col justify-center  
                                  items-center space-y-3">
       <h1 className="text-center font-roboto 
                      font-extrabold text-xl">
                      Congratulations guy 🤩</h1>
   <div>
    {
      api.map((x, key)=><>
       <p className="bg-blue-100 text-blue-600
        rounded-md w-14 px-2">
          {x.type}
          </p>
      <p>
        {key + 1}.{x.question}
      </p>
      {x.type === 'mcq' ? <div className="flex">
     
        {
          x.clude.map((i ,key)=> <div className={ i.selected ?
          "bg-green-100 my-1 px-2 py-1.5 rounded-md text-green-700" 
          : "mt-1 px-2 py-1.5"}>{
            i.title
            }</div>)
        }
      </div>  : <div className="mt-2">
        <p className="flex items-center" >fill answer 
       <span className="bg-green-100 text-green-700 
                        rounded-md mt-1 mx-2 px-2 py-1.5">
                        {x.answer}</span> </p>
        </div>}
      </>)
    }
   </div>
   <div className="items-start">
   <button className="bg-blue-200 px-3 py-1.5 
   rounded-md text-blue-700"
    onClick={()=> {
    setCurrentQuestion(0)
    setShowSocre(false)}}>
      Get Back
   </button>
   </div>
      </div> : <>
      <h1 className="font-roboto text-[18px] 
      py-2">{currentQuestion +1} .{change}
       {api[currentQuestion].type === 'blank'  ?
        <FillBlanks values={api[currentQuestion]?.answer}
         evnet={handleChange}
         sentence={api[currentQuestion].question}/>
          : api[currentQuestion].question} </h1>
    <div className="flex flex-col ">
      {
        api[currentQuestion].type == "mcq" && <>
        {api[currentQuestion].clude.map((x, id)=> <>
           <label className="flex items-center">
           <input
           className="w-5 h-5 text-blue-600 bg-gray-100
            border-gray-300 rounded focus:ring-blue-500"
           onChange={()=>handlecheckAns(x.id , api[currentQuestion].id)} 
           type="checkbox"
           name="answer" checked={x.selected} />
         <p className="ml-2 text-sm font-medium text-gray-900 py-3.5"> {x.title}</p> 
         </label>
         </>)}
        </>
      }
      {
        api[currentQuestion].type === 'blank' && <>
          <p>choose word below and fill blank</p>
          <div className="">
        <ul className="flex  space-x-3 font-roboto my-2 
        font-semibold">
        {
          api[currentQuestion].clude.map((v)=>
          <li className="border-[1px] rounded-md
           px-2 py-1 border-blue-400">
            {v.title}
          </li>)
        }
        </ul>
       </div>
        </>
      }     
    </div>
    <button
     className="bg-blue-200 px-3 py-1.5 
                 rounded-md text-blue-700" 
                onClick={handlenext}>
      next
      </button> 
      </>
    } */}
  </div>
}