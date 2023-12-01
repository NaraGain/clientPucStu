import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import Icon from "../../../components/Icon";
import { Link } from "react-router-dom";



export default function ExamStatus ({data,showQuestion,title, currentQuestion ,link}){
  
const [active ,setActive] = useState('tab1')


const checkedQuestion = (index,completed) => {
  let styleList = ""
  if(completed){
    styleList = examStatusStyle.listyle["normalstyle-checkd"]
    return currentQuestion.qid === index ? examStatusStyle.listyle["active-checked"] 
    + examStatusStyle.listyle.liststyle : examStatusStyle.listyle["normalstyle-checkd"]
  }else{
    styleList = examStatusStyle.listyle["normalstyle-uncheckd"]
    return currentQuestion.qid === index ? examStatusStyle.listyle["active-unchecked"] 
    + examStatusStyle.listyle.liststyle : examStatusStyle.listyle["normalstyle-uncheckd"]
    
  }


  return styleList 
}


    return (
        <>
        <div className={ showQuestion
           ? examStatusStyle.arrowstyle : 'hidden' }>
          <Link to={link}>
          <div className={examStatusStyle.arrowTextstyle}>
          <Icon Size="1.2rem" name={<BiArrowBack/>} ></Icon>
          <p className="hidden md:block">{title}</p> 
          </div>
          </Link>
        
         </div>


         
  <div className={showQuestion ? examStatusStyle.mainStyle 
    : examStatusStyle.mainwhenfasle}>
    <ul className={examStatusStyle.listyle.ulstyle}>
      {
        showQuestion ?  data.map((item,index)=>
        <li id={index+1}  value={index+1} key={index+1} >
          <Link>
          <a key={index+1} href="#"  onClick={(prev)=> alert(item.qid)}
          className={`${examStatusStyle.listyle.liststyle}
            ${checkedQuestion(item.qid, item.completed) } `}>{index+1}</a>
          </Link>
    
    </li>
        
        )  : <></>
      }
     
    </ul>
  </div>
        
        </>
    )
}

const examStatusStyle ={
  "arrowTextstyle" : "tracking-wider text-[20px] items-center space-x-2 flex flex-row ",
  "arrowstyle" : "cursor-pointer rounded-xl px-2 text-purple-800  space-x-1.5 items-center "
  +"flex justify-between active:bg-purple-100",
  "mainStyle" : "py-4 md:px-2 px-4 ",
  "mainwhenfasle" : "w-full hidden     z-10",
  "listyle" : {
      "liststyle" : "md:py-2 py-1.5 w-8 h-8  px-3 md:px-3.5 rounded-full border-1 border-purple-400",
      "ulstyle" : "inline-flex space-x-2 md:space-x-4 ",
      "active-unchecked" : "border-2 border-purple-500 bg-purple-200 text-purple-800 font-semibold",
      "active-checked"  : "border-2 border-green-600 bg-green-300 text-slate-800 ",
      "normalstyle-checkd" : "bg-green-300 border-green-400 font-semibold text-green-900 border hover:text-gray-700",
      "normalstyle-uncheckd" : "bg-purple-200 text-purple-900 border-purple-400 hover:text-gray-700",
  }
}


const buttonstyle = {
  "nextBtn" : "rounded-xl font-mono text-[18px] relative inline-flex group items-center truncate "+
  " justify-center px-4 w-32 py-2 m-1 cursor-pointer bg-purple-800 text-white active:bg-purple-600 active:shadow-none",
  "prevBtn" : "rounded-xl text-[18px] font-mono relative inline-flex group items-center truncate "+
  " justify-center px-4 w-32 py-2 m-1 cursor-pointer bg-purple-100 text-purple-800 active:bg-purple-50 active:shadow-none",
  "grenBtn" : "rounded relative inline-flex group items-center truncate  "
  +"  justify-center px-4 w-32 py-2 m-1 cursor-pointer bg-purple-100 text-purple-800 active:bg-purple-50 active:shadow-none",
}