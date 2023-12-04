import React, { useEffect, useState,useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../../style/style.css"
import Cookies from "universal-cookie"
import { useDispatch } from "react-redux"
import { authAction } from "../../redux/authSlice"
import { Input, Form, message } from "antd"
import { loadingAction } from "../../redux/loaderSlice"
import { login } from "../../api/user"

const cookie = new Cookies

const LoginForm = () => {
    const [username , setUsername] = useState()
    const [password,setPassword] = useState()
    const [error, setError] = useState(false)
    const [messageApi ,contextHolder] = message.useMessage()
    const dispatch = useDispatch()
    const navigator = useNavigate()
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            dispatch(loadingAction.ShowLoading())
            const response = await login({
                username : username,
                password : password,
            }) 
            dispatch(loadingAction.HideLoading())
            console.log(response) 
            if (response.success){ 
               cookie.set('STUDENTTOKEN', response?.token, {
                path : '/'
               })
               dispatch(authAction.userInof({userId : response.id}))
               cookie.set('studentname', response?.name)
                  navigator('/main', {
                    state : {
                        group : response?.courseName
                    }
                  })
            }else{
                setTimeout(()=>{
                    messageApi.open({
                        key : 'updatable',
                        type : 'error',
                        content : `${response.message}`
                    })
                }, [1000])
                
            }
            
            dispatch(loadingAction.HideLoading())

        } catch (error) {
            message.error(error)
            console.log(error)
            messageApi.open({
                key : 'updatable',
                type : 'error',
                content : `${error}`
            })
            setError(true)
            dispatch(loadingAction.HideLoading())
            
        }
    }

return  <div className="flex md:items-center min-h-screen md:bg-gray-50">
    {
        contextHolder
    }
<div className="flex-1 h-full max-w-4xl mx-auto bg-none md:bg-white rounded-lg md:shadow-xl">
    <div className="flex flex-col md:flex-row">
        <div className="h-full md:h-auto md:w-1/2 ">
            <img className="object-cover w-full md:h-full h-[16rem] rounded-none md:rounded-tl-lg md:rounded-bl-lg" 
            src={"https://travelcdns.cambodia-travel.com/1664686135549.jpg"}
                alt="img" />
        </div> 
        <div className="flex items-center justify-center mt-3 md:mt-0  md:w-1/2">
            <div className ="w-full px-4  md:px-0">
            <div className="text-purple-900 text-start space-y-2  sm:px-12 sm:mt-7">
                <h1 className=" text-2xl font-semibold ">
                 Welcome {username}
                </h1>
                <p className="text-[16px] text-gray-500"> 
                Login to Your Account
                    </p>
                </div>
                <form>
                <div className="sm:pb-8 my-5 sm:px-12">
                <div>
                    <label className="block mb-2 text-start text-md font-semibold">
                        Username
                    </label>
                    <Input 
                        onChange={(e)=> setUsername(e.target.value)}
                        className="w-full py-2"
                         />
                </div>
                <div>
                    <label className="block my-2 text-start text-[16px] font-semibold ">
                        Password
                    </label>
                    <Input.Password onChange={(e)=> setPassword(e.target.value)} className="py-2"/>
                </div>
                    <p className="font-thin-[200px] my-2 text-center hover:text-purple-900 text-[14px]
                           text-variation-500 hover:text-variation-400">
                    <Link to={"/login/reset-account"}>
                    Get Help with Signing In!
                        </Link>
                    </p>
            
         <button
         type="submit"
         onClick={handleSubmit}
                    className="block w-full px-4 py-2 text-[16px] mt-5 
                    text-sm bg-variation-500 rounded-md font-medium leading-5 text-center 
                    text-white transition-colors duration-150
                     bg-purple-700 border border-transparent 
                     active:bg-variation-400 hover:bg-blue-700 focus:outline-none 
                     focus:shadow-outline-blue"
                    href="#">
                    Log in
                </button>
                </div>
                </form>
    

            </div>

        </div>

    </div>
</div>
</div>
}


export default LoginForm