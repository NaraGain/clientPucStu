import { Input,Button } from "antd"
import React, { useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import reactStringReplace from "react-string-replace"
import { questionAction } from "../redux/questionSlice"





export default function FillBlanks({event ,sentence ,correctAnswers, regExps, questionId}) {
    const [answer , setAnswer]  = useState({})
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const result = sentence.replace(new RegExp(regExps.join('|'), 'g'), '@')
    const sign = '@'
    let score = 0
    const newCorrectAnswer = correctAnswers[0]
    const handleChange = (e) => {
        const {value , name} = e.target
        setAnswer({...answer , [name]: value})

    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        for (const key in newCorrectAnswer){
            if (answer[key].toLowerCase() === newCorrectAnswer[key].toLowerCase()){
                score+=1
                dispatch(questionAction.countMarkPoint({markPoint : score }))
            }
        }
    }


    let count = 0;
    const StringReplace = reactStringReplace(result, sign , (macth, index,offset) =>(
         <span key={index/2} className={fillBlankStyle.spanTag}>
         <input ref={inputRef} name={`blank${count+=1}`} 
          onChange={(e)=> handleChange(e)} className={fillBlankStyle.inputTag}/>
        {/* <select className={styleFillBlank.selectbox}>
            <option value="selcetd"></option>
            {props.clude.map((value) => <option key={value} value={value}>{value}</option>)}
        </select> */}
    </span>
  ))
    return <div className={fillBlankStyle.divTagMain}>
            <p className={fillBlankStyle.paragrah}>{StringReplace}</p>
            {/* <p className={fillBlankStyle.paragrah}>{fill}</p> */}
            <div className="flex w-full justify-end my-3">
            <Button className="rounded-full font-bold bg-yellow-300" onClick={handleSubmit}>Submit</Button>
            </div>
    
    </div>
}

const fillBlankStyle = {
    "main": "",
    "inputTag" : "w-[10rem] rounded-md border-[1px] border-gray-300 px-2 py-[1px]",
    "selectBox": "rounded-[4px]",
    "spanTag": "px-2 rounded-md leading-tight tracking-wide ",
    "divTagMain": "flex flex-col justify-center ",
    "divTagulList": "",
    "liTags": "bg-gray-50 text-center  px-2 "
                    +" rounded-full md:rounded-[4px] text-[10px] shadow-sm "
                    +" shadow-gray-500/10 md:text-[14px] cursor-pointer",
    "paragrah": "tracking-wider text-start text-[16px] md:text-[18px] "
    +" 2xl:text-[20px] px-3 font-sans 2xl:leading-[4rem] leading-[3.5rem] text-slate-700"
}