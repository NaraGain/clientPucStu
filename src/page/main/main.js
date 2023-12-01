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
import { CiAlignCenterV, CiCircleInfo } from "react-icons/ci";



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
    <nav
     className="bg-white m-0 bg-repeat flex justify-between items-center 
     bg-auto shadow-sm shadow-neutral-200 fixed w-full z-10 py-2 px-3">
        <span className="flex items-center gap-3">
        <img   className="w-9 h-9"  src="./asset/Puc_logo.png"/>
        <ul className="flex gap-3 mx-7 font-normal text-gray-600">
            <li className="disable cursor-not-allowed">
                Class
            </li>
            <li>
                <Link
                state={data?.exam ? data?.exam[0] : null} 
                to={"/exam"}
                >
                Exam
                </Link>
                </li>
        </ul>
        </span>
        
        <AvatarUser/>
    </nav>
    <Container>
    <div className=" mx-2 md:max-w-7xl h-full md:mx-auto flex
     justify-center gap-2 relative top-[5rem]">
        <div className="w-full ">
        <Card
        className="rounded-"
        >
        <Meta
          avatar={<Avatar  name={cookie.get('studentname')}/>}
          title={`Hi ${cookie.get('studentname')}`}
          description={<p className="text-variation-400">
            GroupName :
            {groups.state.group}

          </p>}
        />
        <div className="flex justify-end">
        <Link state={data?.exam ? data?.exam[0] : null} 
         to={"/exam"}>
        <Button className="rounded-full
         bg-variation-500 text-white w-[7rem]">Exam</Button>
        </Link>
        </div>
             
        </Card>  
    
    <div className="grid md:grid-cols-2 mt-[1rem] gap-4">
    <Card className="rounded-xl"  >
                <Meta
          avatar={<div className="bg-neutral-50 p-2
           border-neutral-200 border-[1px]  rounded-full">
            <Icon color={"#0f3460"}
         Size="3rem" name={<CiAlignCenterV/>}></Icon>
            </div>}
          title="Class"
          description={ <ul className="flex flex-wrap gap-2">   
          </ul>
          }
        />
            </Card>
    <Card className="rounded-xl">
                <Meta
                 avatar={<div className="bg-neutral-50 
                 rounded-full border-neutral-200 border-[1px]  p-4">
                    <Icon Size={"3rem"}
                  name={<CiCircleInfo/>}></Icon>

                 </div>}
                  title={"Report"}
                />
        </Card>
    </div>
    

        </div>
 

   </div>       
    </Container>
 
    
    </>
}



