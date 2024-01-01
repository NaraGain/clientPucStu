import { useState,useEffect,useRef } from 'react'
import Icon from './Icon';
import {FcAlarmClock} from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux';
// import { TimerAction } from '../redux/TimerSlice';
import io from 'socket.io-client'
import { questionAction } from '../redux/questionSlice';
import axios from 'axios';
import { message,Button,Form } from 'antd';
import { addToReport } from '../api/report';
import axiosInstance from '../api';
import { SubmitReport } from './Submit';



 const Timer = ({initialMinute,initialSeconds}) => {
    const [ countdown, setCountDown] =
     useState({initialMinute : 0 , initialSeconds : 0});
    const [seconds, setSeconds ] =  useState();
    const [socket , setSocket] = useState(null)
    const [disable ,setDisable] = useState(false)
    const report = useSelector(state => state.report)
    const [buttonSubmit , setButtonSubmit] = useState(false)
    const [conutdownSubmit,setCountDownSubmit] = useState(false)
    const [count ,setCount] = useState(10)
    const dispatch = useDispatch()
    const formRef = useRef(null)

    useEffect(()=>{
        const sockectInstance = io()
        setSocket(sockectInstance)
        sockectInstance.on('countdown', 
        ({minutes , remainingSeconds})=> { 
           setCountDown({
            initialMinute : minutes,
            initialSeconds : remainingSeconds,
           })
        })

        sockectInstance.on('countdownFinished', ()=> {
            setCountDownSubmit(true)
            sockectInstance.disconnected()
        })
    }, []);



    return (<>  
        {conutdownSubmit ? <SubmitReport/> : <></>}
        <div className='flex gap-1'>{
        countdown.initialMinute === 0 && 
        countdown.initialSeconds === 0 ? <></> : <div className=' md:text-[14px] text-[12px] '>
        { countdown.initialMinute === 0 && countdown.initialSeconds.toString() === "00"
            ?  <div 
            className='py-1 px-2 md:px-2 bg-neutral-50 text-variation-500 font-sans font-bold space-x-2 
            flex items-center rounded-full border-[1px] border-yellow-300
               '>
                <p className='text-yellow-700 '>
                    Time is Out</p></div>
            : <div className={`py-1 px-3 md:px-1.5 text-variation-500
             border-[1px] bg-neutral-50 gap-3 flex items-center 
             ${ countdown.initialMinute <= 5 ? 'border-rose-500 text-rose-500 bg-neutral-50'
             :" bg-neutral-50  border-neutral-200" }
                 rounded-full  `}>
                    <div className='h-5 w-5 md:h-4 md:w-4'>
                    <Icon name={<FcAlarmClock/>}></Icon>
                    </div>
                  <h1 className='font-mono font-bold text-[16px] '>
                     {countdown.initialMinute}:{countdown.initialSeconds < 10 ?  `${countdown.initialSeconds}`
                      : countdown.initialSeconds}</h1> 
             </div> 
        }
        </div>
    }     
                </div>  </>)
}

export default Timer