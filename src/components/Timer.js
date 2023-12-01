import { useState,useEffect } from 'react'
import Icon from './Icon';
import {FcAlarmClock} from "react-icons/fc"
import { useDispatch, useSelector } from 'react-redux';
// import { TimerAction } from '../redux/TimerSlice';
import io from 'socket.io-client'
import { questionAction } from '../redux/questionSlice';



 const Timer = ({initialMinute,initialSeconds}) => {
    const [ countdown, setCountDown] = useState({initialMinute : 0 , initialSeconds : 0});
    const [seconds, setSeconds ] =  useState();
    const [socket , setSocket] = useState(null)
    const [disable ,setDisable] = useState(false)
    const dispatch = useDispatch()


    useEffect(()=>{
        const sockectInstance = io()
        setSocket(sockectInstance)
        sockectInstance.on('countdown', ({minutes , remainingSeconds})=> { 
           setCountDown({
            initialMinute : minutes,
            initialSeconds : remainingSeconds,
           })
        })

        sockectInstance.on('countdownFinished', ()=> {
            dispatch(questionAction.disableState())
        })
    // let myInterval = setInterval(() => {
    //         if (seconds > 0) {
    //             setSeconds( seconds - 1);
    //         }
    //         if (seconds === 0) {
    //             if (minutes === 0) {
    //                 clearInterval(myInterval)
    //             } else {
    //                 setMinutes(minutes - 1);
    //                 setSeconds(59);
    //             }
    //         } 
    //     }, 1000)
    //     return ()=> {
    //         clearInterval(myInterval);
    //       };
    }, []);
    return ( <> {
        countdown.initialMinute === 0 && 
        countdown.initialSeconds === 0 ? <></> : <div className=' md:text-[14px] text-[12px] '>
        { countdown.initialMinute === 0 && countdown.initialSeconds === 0
            ? <div 
            className='py-1 px-2 md:px-2  font-sans font-bold space-x-2 
            flex items-center rounded-md border-[1px] border-yellow-300
               '>
                <p className='text-yellow-700 '>
                    😌Time is Out</p></div>
            : <div className={`py-1 px-3 md:px-1.5 text-variation-500 border-[1px]   gap-3 flex items-center 
             ${ countdown.initialMinute <= 5 ? 'border-rose-500 text-rose-500 ':" bg-neutral-50  border-neutral-200" }
                 rounded-md  `}>
                    <div className='h-5 w-5 md:h-4 md:w-4'>
                    <Icon name={<FcAlarmClock/>}></Icon>
                    </div>
                  <h1 className='font-mono font-bold text-[16px] '>
                     {countdown.initialMinute}:{countdown.initialSeconds < 10 ?  `${countdown.initialSeconds}` : countdown.initialSeconds}</h1> 
             </div> 
        }
        </div>
    }     
   </> )
}

export default Timer