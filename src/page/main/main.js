import { Button, Card, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Container from "../../components/Container";
import { AvatarUser } from "../../layout/ExamLayout";
import axios from "axios";
import Cookies from "universal-cookie";
import Avatar from "../../components/Avatar";
import { useDispatch } from "react-redux";
import Icon from "../../components/Icon";
import { CiAlarmOn, CiAlignCenterV, CiCircleInfo, CiMedal, CiReceipt, CiUser} from "react-icons/ci";
import Header from "../../components/Header"
import Timer from "../../components/Timer";


export default function Main () {

    const [data ,setData] = useState([])
    const groups = useLocation()
    const {Meta} = Card
    const cookie = new Cookies()
    const dispatch = useDispatch()

    const handleOnGet = async ()=>{
       await axios.post(`${process.env.REACT_APP_API_KEY}group/student/query`,
        {courseName : groups.state.group}).then((res)=> {
            setData(res.data.result)
        }).then((error)=>{
            message.error(error.response.message)
        })
    }

    useEffect(()=> {
        handleOnGet()
    },[])

    return <>
    <div className=" mx-2 md:container h-full md:mx-auto flex flex-col
     justify-center gap-2  mt-[5rem]">
        <div
        className="rounded-xl p-0  text-white w-full ">
        <div className="flex flex-col lg:flex-row gap-2 m-0">
          <div className="lg:basis-[70%] bg-rose-50 p-[3rem] rounded-xl ">
            <span className="flex gap-2 items-center">
              <Icon color={"#be123c"} Size={"5rem"} name={<CiUser/>}></Icon>
              <div>
              <p className="text-variation-500 text-[24px] lg:text-[38px]">
            Hello {cookie.get('studentname')}</p>
              <p className="text-variation-500 text-[18px]">
            GroupName :
            {groups.state.group}
          </p>
              </div>
          
            </span>
          </div>
        <div className="lg:basis-1/2 rounded-xl p-[3rem] bg-purple-100">
          <span className="flex gap-2 items-center">
            <div className="h-[5rem] w-[5rem]">
            <Icon color={"#581c87"}  name={<CiReceipt/>}></Icon>
            </div>
            <div>
            <p className="text-variation-500
             font-semibold text-[32px] lg:text-[38px]">
              exam
          </p>
          <Timer/>
          <div>
          <Link state={data?.exam ? data?.exam[0] : null} 
         to={"/exam"}>
        <Button className="rounded-full border-none mt-4 
         bg-variation-500 text-white w-[10rem]">Go to exam page</Button>
        </Link>
          </div>
            </div>
          </span>
        </div>
        </div> 
        </div> 
        <div className="mt-4 flex gap-3 items-center">
        <Icon Size={"2rem"} name={<CiMedal/>}/>
        <h1 className="text-[20px]">Activities</h1>
          </div>   
    <div className="grid grid-cols-2 mt-[1rem] gap-2">
    <Card className="rounded-xl bg-yellow-50  md:p-[3rem]">
                <Meta
          avatar={<div className="md:gap-2 flex flex-col md:flex-row">
            <Icon color={"#0f3460"}
         Size="4rem" name={<CiAlignCenterV/>}></Icon>
           <p className="text-[34px]">classes</p>
            </div>}
        />
            </Card>
    <Card className="rounded-xl md:p-[3rem] border-none
     bg-green-50 shadow shadow-yellow-50">
                <Meta
                 avatar={<div className="flex flex-col md:flex-row md:gap-2 items-center">
                    <Icon color={"#166534"} Size={"4rem"}
                    name={<CiCircleInfo/>}></Icon>
                        <p className="text-[34px]">Report</p>
                 </div>}
                />
        </Card>
    </div>
   </div>       
    </>
}



