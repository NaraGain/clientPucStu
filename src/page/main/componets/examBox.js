import {useState , useEffect} from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {Form , message} from 'antd'
import { CiReceipt } from 'react-icons/ci'
import Icon from '../../../components/Icon'
import { IoEllipse } from 'react-icons/io5'
import { updateExamOnfinish } from '../../../api/exam'


export const ExamBox = ({exam, currentDate , group}) => {
    const findExamId = exam.find((i)=>
    moment(i.date).format('LL') == moment(currentDate).format('LL'))
   

    const updateExamToOnFinish = async (id ,value , interval) => {

        try {
         if(moment(currentDate).format('LL') === moment(findExamId?.date).format('LL')){
            const response = await updateExamOnfinish(id, value)
              if(response.success){
            //    message.success(response.message)
               clearInterval(interval)
              }else{
                message.error(response.data.message)
          } 
          }else{
            message.info('no exam exist')
          }
        } catch (error) {
          message.error(error)
        }
      }


useEffect(()=>{
       const endTime = new Date(findExamId?.time)
       //handle update with time is up
        const interval = setInterval(()=> {
            if(currentDate.getHours() === endTime.getHours() 
            && currentDate.getMinutes() >= findExamId?.duration-1 ){
            updateExamToOnFinish( findExamId._id,{
               onfinish: true,
               description : 'exprire date',
            }, interval)
            }else{
              // message.error(findExamId?._id)
            }
        } , 1000)
        return () => clearInterval(interval)
}, [findExamId])


       
   return <>
          {
            exam ? exam.map((exams, key)=><Form key={key}>
               <Link to={`/exam?id=${exams._id}`}>
            <button className=" mt-4 border-neutral-200
            active:bg-neutral-50 border-dashed
             border-[1px] text-gray-600
             px-5  py-2 rounded-xl">
              <div className="flex justify-end py-1">
              <Icon color={exams?.onfinish ? "green" : "blue"} 
              Size={"1rem"} name={<IoEllipse/>}></Icon>
              </div>
              <hr></hr>
              <div className="w-[4rem]​​ ​ h-[4rem] my-4">
                <Icon color={"#0f3460"} name={<CiReceipt/>}/>
              </div>
              <div className="pb-6 py-2 font-roboto text-[16px]">
            <p className='font-semibold'>exam {moment(exams?.time).format('LT')}</p>  
             <p>{exams.name}</p>
              </div> 
             </button>
            </Link>
             </Form>) : <p>
              no exam exist
             </p>
          }   
          </>  
}