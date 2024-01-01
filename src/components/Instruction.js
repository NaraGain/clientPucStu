import Icon from "./Icon"
import {CiBellOn, CiCircleQuestion} from "react-icons/ci"
import Timer from "../components/Timer"

const descrition = {
  "listening" : {
    "desc" : "Listen to an audio and then check the correct answers",
   
  },
  "reading" : {
    "desc" : "Reading the text and choose the correct answers below",
   
  },
  "vocabulary" : {
    "desc" : "Use the word in the box and make a correct answer of the sentences",
   
  },
  "grammer" : {
    "desc" : "Choose to sentence and Make a correct answer ",
 
  },
}

const renderDesc = (title)=>{
  const text = title

  if(title === "LISTENNING"){
    return descrition.listening.desc
  }else if(title === "READING"){
    return descrition.reading.desc
  }else if (title === "GRAMMAR"){
    return descrition.grammer.desc
  }else if (title === "VOCABULARY"){
    return descrition.vocabulary.desc
  }
  return "Read each question thoroughly before answering"
}


export default function Instruction ({headers}){
     const header =  headers.toUpperCase()
       return <div className="mt-4 font-roboto"> 
          <span className="bg-purple-100 border-[1px] border-variation-400 px-2 py-1.5
           my-3 rounded-full items-center gap-2 inline-flex text-variation-400">
            <Icon color={"gray"} name={<CiCircleQuestion/>} Size={"1.5rem"}></Icon>
        <h2 className="tracking-wide">{headers}</h2>
      </span>
     <article className={styleInstruction.article}>
     <h1 className="md:text-[18px]"><Icon Size="1.5rem" color={""} name={<CiBellOn/>}>
      </Icon></h1> 
        <p className={styleInstruction.paragrah}>
       {renderDesc(header)}
        </p>
     </article>
     </div>
    
    
 }

 const styleInstruction = {
  "article": "flex md:py-3 py-4   items-center space-x-1 md:space-x-3 items-center md:space-x-2 tracking-wide",
  "header": "font-semibold leading-none text-sm ",
  "paragrah": "text-[16px] text-purple-700 md:text-[16px] md:w-full w-80 truncate text-gray-600"
}