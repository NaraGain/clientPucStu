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
          <span className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 text-white border-[1px] border-variation-400 px-2 py-1.5
           my-3 rounded-full items-center gap-2 inline-flex text-variation-400">
            <Icon color={"white"} name={<CiCircleQuestion/>} Size={"1.5rem"}></Icon>
        <h2 className="tracking-wide">{headers}</h2>
      </span>
     <article className="flex md:py-3 py-4 space-x-1 
                       items-center md:space-x-2 tracking-wide">
     <h1 className="md:text-[18px]"><Icon Size="1.5rem" color={""} name={<CiBellOn/>}>
      </Icon></h1> 
        <p className="text-[16px] md:text-[16px] md:w-full w-80 truncate text-gray-600">
       {renderDesc(header)}
        </p>
     </article>
     </div>
    
    
 }
