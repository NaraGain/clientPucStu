import { Link } from "react-router-dom"
import Icon from "../../../components/Icon"
import {  CiEdit,
   CiHeadphones, CiViewList} 
   from "react-icons/ci"
import { MdCreditScore } from "react-icons/md";
import {RxLetterCaseLowercase} from 'react-icons/rx'
import { BsPatchQuestion, BsQuestionDiamond,
   BsCardChecklist, BsChatText } from "react-icons/bs";
import { useSelector } from "react-redux"



export function QuizCard ({title,desc,number,link,
  progress}){
const disableLink = useSelector(state => state.question.timeOut)
  const renderIcon = ()=>{
    const names = title.toUpperCase()
    if (names === 'READING')   { 
      return <CiViewList/> 
    }
    else if(names === "WRITING"){
        return <CiEdit/>
    }else if(names === "VOCABULARY"){
      return <RxLetterCaseLowercase/>
    }else if (names === "GRAMMAR"){
      return  <BsChatText/>
    }else if (names === "LISTENING"){
      return <CiHeadphones/>
    }
    else{
      return <BsPatchQuestion/>
    }
 

  }

 

    return <Link 
    to={disableLink ? `/main` : `/exam/question?name=${link}&index=1` }>
    <div className={`min-w-full min-h-fit  font-roboto overflow-hidden
      `}>
    <div className={`md:px-6 px-4 py-4 lg:py-2 2xl:py-4 2xl:space-y-4 
    bg-white rounded-xl border-[1px] border-neutral-200 hover:bg-yellow-50 hover:z-10 `}>
           <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600 w-10 h-10 
            p-2 my-2 lg:w-[4rem]  rounded-full lg:h-[4rem] ">
            <Icon color="#ffff" name={ title ? renderIcon(title) : null} ></Icon>
            </div>    
              <h1 className="md:text-xl truncate text-center tracking-wide font-roboto
         t">{title}</h1>

           </div>
       <div className="
       font-rotobo
       flex flex-wrap   border-t
        border-gray-300 gap-5 text-[14px] py-2">
       <div className="flex items-center gap-1">
       <Icon Size={'1rem'} name={<BsQuestionDiamond/>}/>
          <button className="">question {number}</button>
       </div>
       <div className="flex gap-1 items-center">
       <Icon Size={'1rem'} name={<MdCreditScore/>}/>
        <button className="">score {desc}</button>
       </div>
       <div className="flex gap-1 items-center">
        <Icon color={progress > 0 ? "#10b981" : "#000"} Size={'1rem'} name={<BsCardChecklist/>}/>
          <button className={progress > 0 ? "text-green-500 font-semibold" : ''}>{progress } / {number}</button>
       </div>
       </div>     
    </div>      
  </div>
    </Link>
    
    
  }
