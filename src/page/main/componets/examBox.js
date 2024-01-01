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
    const [timeObject , setTimeObject] = useState({
        start : group ? group[0] : 0,
        end    : group ? group[1] : 1
    })
   

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

        const filtered = exam.filter((items , key)=> {
        const examDate = moment(items?.date).format("DD/MM/YYYY")
            const dateToFilter = moment(currentDate).format("DD/MM/YYYY")
            const currentTime = new Date(currentDate)
            const examTime = new Date(items?.time)

            return examDate === dateToFilter && 
            examTime.getHours() === currentTime.getHours()
            && currentTime.getMinutes() <= 59
             && items.onfinish == false
          })

useEffect(()=>{
       const endTime = new Date(findExamId?.time)
       //handle update with time is up
        const interval = setInterval(()=> {
            if(currentDate.getHours() === endTime.getHours() 
            && currentDate.getMinutes() >= findExamId?.duration ){
            updateExamToOnFinish( findExamId._id,{
               onfinish: true,
               description : 'exprire date',
            },
            interval
            )
            }else{
              // message.error(findExamId?._id)
            }
        } , 1000)
        return () => clearInterval(interval)
}, [findExamId])


       
   return <>
          {
            filtered ? null : <p className='text-gray-600 text-[14px]
             bg-yellow-50 rounded-full px-4 py-1.5'>exam are not available</p>
          }
          {
            filtered.map((exams, key)=><Form key={key}>
               <Link to={`/exam?id=${exams._id}`}>
            <button className=" border-neutral-200
            active:bg-neutral-50
             border text-gray-600
             px-5  py-2 rounded-xl">
              <div className="flex justify-end">
              <Icon color={exams?.onfinish ? "green" : "blue"} 
              Size={"1rem"} name={<IoEllipse/>}></Icon>
              </div>
              <div className="py-6">
              {exams.name}
              <div className="w-[4rem]​​ ​ h-[4rem] my-4">
                <Icon name={<CiReceipt/>}/>
              </div>
            <p>Exam_Time {moment(exams?.time).format('LT')}</p>  
              </div> 
             </button>
            </Link>
             </Form>)
          }   
          </>  
}