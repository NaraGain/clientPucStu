import React, { useState} from "react"
import { Link} from "react-router-dom"
import "../../style/style.css"
import Cookies from "universal-cookie"
import { useDispatch } from "react-redux"
import { Input,message} from "antd"
import { loadingAction } from "../../redux/loaderSlice"
import { login } from "../../api/user"

const cookie = new Cookies

const LoginForm = () => {
    const [username , setUsername] = useState("to PUCIFL")
    const [password,setPassword] = useState()
    const dispatch = useDispatch()

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(loadingAction.ShowLoading())
            const response = await login({
                username : username,
                password : password,
            }) 
            dispatch(loadingAction.HideLoading())
            if (response.success){ 
               cookie.set('STUDENTTOKEN', response?.token, {
                path : '/'
               })
               const encodedString = btoa(response?.courseName)
               cookie.set('studentname', response?.name)
               cookie.set('stuId', response?.id)
              window.location.href = `/main?group=${encodedString}`
            }else{
               message.error(response.message) 
            }      
        } catch (err) {
            message.error(err)
        }
    }

return  <div className="flex items-center bg-login min-h-screen font-roboto">
<div className="flex-1 h-full max-w-md mx-auto bg-none">
    <div className="flex justify-center items-center">
    <img className="w-[3rem] h-[3rem]"  src="./asset/Puc_logo.png"></img>
    </div>
      
        <div className="flex items-center gap-2 my-2 justify-center  ">
            <div className ="w-full px-4  md:px-0">
            <div className=" space-y-1   text-center">
                <h1 className=" text-[24px] font-roboto ">
                 Welcome  {username}
                </h1>
                <p className="text-[16px] text-gray-600 font-roboto"> 
                Login to Your student account
                    </p>
                </div>
                <form>
                <div className="sm:pb-8 my-5 sm:px-12">
                <div>
                    <label className="block mb-2  text-gray-600 text-[14px] ">
                        Username
                    </label>
                    <Input 
                        onChange={(e)=> setUsername(e.target.value)}
                        className="w-full py-2"
                         />
                </div>
                <div>
                    <label className="block my-2 text-gray-600  text-[14px]  ">
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
                    className="
                    bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-600
                    block w-full font-roboto px-4 py-2.5 text-[16px] mt-5 
                    text-sm rounded-xl font-medium leading-5 text-center 
                    text-white transition-colors duration-150
                     active:bg-purple-700 border border-transparent 
                      hover:bg-blue-700 focus:outline-none 
                     focus:shadow-outline-blue"
                    href="#">
                    sign in
                </button>
                </div>
                </form>
            </div>

        </div>

    </div>
</div>
}


export default LoginForm