import { Link } from "react-router-dom"
import Icon from "../../../components/Icon"
import { CiChat2, CiCircleQuestion, CiEdit,
   CiHeadphones, CiText, CiViewList } 
   from "react-icons/ci"
import { useSelector } from "react-redux"
import {Tag} from "antd"


export function QuizCard ({title,desc,examId,number,link,
  progressPercentage ,id, onAnswer}){
const disableLink = useSelector(state => state.question.timeOut)
  
  const renderIcon = ()=>{
    const names = title.toUpperCase()
    if (names === 'READING')   { 
      return <CiViewList/> 
    }
    else if(names === "WRITING"){
        return <CiEdit/>
    }else if(names === "VOCABULARY"){
      return <CiText/>
    }else if (names === "GRAMMAR"){
      return  <CiChat2/>
    }else if (names === "LISTENNING"){
      return <CiHeadphones/>
    }
    else{
      return <CiCircleQuestion/>
    }
 

  }

  const calulateProgress = (question) => {
    return  question
  }

    return <Link state={{id:id, score : desc}} 
    to={disableLink ? `/main` : `/exam/sub/${link}`}>
    <div className={`min-w-full min-h-fit  overflow-hidden
      `}>
    <div className={`md:px-6 px-4 py-8  md:py-4  2xl:space-y-4 
    bg-white rounded-lg border-[1px] border-neutral-200
      hover:bg-gradient-to-b hover:from-gray-400 hover:to-gray-800 hover:z-10 `}>
           <div className="flex  items-center gap-2">
            <div className=" w-10 h-10 lg:w-[4rem] lg:h-[4rem] ">
            <Icon color="#0f3460" name={ title ? renderIcon(title) : null} ></Icon>
            </div>    
              <h1 className="md:text-xl truncate text-center tracking-wide font-roboto
         t">{title}</h1>
           </div>
       <div className="flex flex-wrap lg:gap-0  gap-3 py-2">
       <div className="bg-gray-50 
        text-slate-900 text-center rounded-l-full flex">
          <Tag color="purple">question {number}</Tag>
       </div>
       <div className="bg-gray-100 flex items-center">
        <Tag color="green">score {desc}</Tag>
       </div>
       <div className="bg-gray-50 flex items-center rounded-r-full -mx-1">
          <Tag color="blue">{calulateProgress(number)}%</Tag>
       </div>
      
       </div>
      
      
      
    </div>
    {/* <div className="bg-variation-400 py-1 rounded-br-lg rounded-bl-lg"></div> */}
      
  </div>
    </Link>
    
    
  }