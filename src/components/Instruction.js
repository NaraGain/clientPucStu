import Icon from "./Icon"
import {FcIdea} from "react-icons/fc"


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
  "writining" : {
    "desc" : "Write at less 100 word in paragraph",
   
  }
}


export default function Instruction ({headers}){
     const header =  headers.toUpperCase()
       return <div> 
     <article className={styleInstruction.article}>
     <h1 className="md:text-[18px]"><Icon Size="1.5rem" name={<FcIdea></FcIdea>}>
      </Icon></h1> 
        <p className={styleInstruction.paragrah}>
           { header === "LISTENING" && descrition.listening.desc}
          { header === "READING" && descrition.reading.desc}
          { header === "GRAMMAR" && descrition.grammer.desc}
          { header === "VOCABULARY" && descrition.vocabulary.desc}
          { header === "WRITING" && descrition.writining.desc}
          
        </p>
     </article>
     </div>
    
    
 }

 const styleInstruction = {
  "article": "flex md:py-5 py-4   items-center space-x-1 md:space-x-3 items-center md:space-x-2 tracking-wide",
  "header": "font-semibold leading-none text-sm ",
  "paragrah": "text-[16px] text-purple-700 md:text-[16px] md:w-full w-80 truncate text-gray-800"
}