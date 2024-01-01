import {useState, useEffect} from 'react'
import {Form , message, Button} from "antd"
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '../api'
import { questionAction } from '../redux/questionSlice'
import { useNavigate } from 'react-router-dom'

//submit will call back when we save file in development process
//counttimer for submit prevent user submit in samething

export const SubmitReport = ()=>{
    const [count ,setCount] = useState(Math.floor(Math.random()*20)+5)
    const report = useSelector(state => state.report)
    const [attempts ,setAttempts] = useState(0)
    const [disabled ,setDisable] = useState(false)
    const [buttonSubmit , setButtonSubmit] = useState(false)
    const dispatch = useDispatch()
    const navigator = useNavigate()



    const handleSubmitReport = async ()=>{
        //change attempts user submit report a less 1 submit could not more than 2 time
        setAttempts(attempts + 1)
        localStorage.setItem('attemps' , parseInt(attempts))
        if(localStorage.getItem('attemps') > 1){
            message.info('could not submit more than 2 time!')
            setDisable(true)
        }else{
        try {
            await axiosInstance.post(`${process.env.REACT_APP_API_KEY}report/add`,
            report
            ).then((res)=> {
                    message.success("upload report successfully..." || res.data.message)
                    setButtonSubmit(false)
                    dispatch(questionAction.addQuestion({question : null}))
                    navigator(-1)
            }).catch((error)=>{
                message.error(error.response.data.message)
                setButtonSubmit(true)
            }
            )
        } catch (error) {
            message.error(error)
        }
    }   
    }

    useEffect(()=> {
        let myInterval = setInterval(()=> {
            if(count > 0){
                setCount(count - 1)
            }
            if(count == 0){
                clearInterval(myInterval)
                handleSubmitReport()
            }
        },1000)
        return ()=> {
            clearInterval(myInterval)
        }
    },[count])


    return <Form onFinish={(e)=> handleSubmitReport()}>
        {
            count == 0 ? <></> : <p>report submit {count}s</p>
        }
        {
            buttonSubmit && <Button disabled={disabled} className='rounded-full bg-green-50
            border
             border-green-800' htmlType='submit'>submit {attempts}</Button>
        }
    </Form>
}