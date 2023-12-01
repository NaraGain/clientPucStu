import Alert from "./Alerts";
import { useEffect, useRef, useState } from "react"
import { Tooltip, message } from "antd";



export const TextArea = ({onpast, onsubmit , row ,spellCheck ,button, countText, reszie})=>{
const [text ,setText] = useState('')
const [wordCount, setWordCount] = useState(0);
const [sentence ,setSentence] = useState()
const [alert ,setAlert] = useState(false)
const alertRef = useRef(false)

const preventCopyPast = (e: ClipboardEvent<HTMLInputElement>)=>{
  e.preventDefault();
  message.warning("Not Allow to copy and past")
 }


    const recalculate = e => {
        setText(e.target.value);
      };
    
      useEffect(()=>{
        const word = text.split(' ')
        let wordCount =  0
        word.forEach((word)=>{
            if(word.trim() !== ''){
                wordCount++
            }
        })
        setWordCount(wordCount)
      },[text])


  const handleChange = (e) =>{
    e.preventDefault()
    console.log(text)
    alert(`uploading...${text}`)

  }

    return (
        <div className={styleWriting["divtag3 "]}>
   {countText ? <p className="text-end text-[16px] mt-2
    font-sans text-gray-600">{wordCount}/200</p> : ""}        
 
  <form onsubmit={()=>handleChange}>
  <textarea maxLength={2000} onResize={reszie} spellCheck={spellCheck} rows={row} 
      className={styleWriting.textarea} 
      onPaste={ onpast ? preventCopyPast : false}
      onChange={recalculate}
       placeholder="Write here..." required>
            </textarea>
            <div className={"w-32 mt-3"}>
              {
                button ?  <Tooltip title ="Are you sure?" >
                <button type="submit "  className="bg-purple-800 px-4
                    py-2 rounded-full text-[14px] tracking-wider
                   font-medium text-white hover:bg-gradient-to-r
                    hover:from-purple-700 hover:to-purple-700 transition-all ease-out 
                    duration-300">Submit</button>
                </Tooltip>  : "" 
              }
           
            </div>
  </form>                   
  </div> 
    )
}

const styleWriting = {
  "divtag2" : "py-4",
  "divtag3 " : " rounded-t-lg space-y-2  h-full  ",
  "divtag4" : " flex pl-0 space-x-1 sm:pl-2",
  "textarea" : "w-full rounded-md bg-gray-50 tracking-widest text-sm  text-gray-900  p-2 focus:border-gray-50 ",
  "divtag5" : "flex items-center justify-between px-3 mt-1  ",
  "btn-style" : " inline-flex items-center py-2 px-4 text-xs font-medium text-center "
  +" text-white bg-purple-800 rounded-[4px] focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800",
  "label-style" : "inline-flex justify-center cursor-pointer p-2 ",
  "input-style" : " ",  
}
