import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { examRule } from "../../../data/data";
import { showAction } from "../../../redux/ShowScore";



export default function Welcome (){
    const [ableBtn,setAbleBtn] = useState(false)
    const dispatch = useDispatch()
    const isShow = useSelector(state => state.show.isShow)
    console.log(isShow)
  
    return  <section className=" mt-[6rem] 2xl:mt-[8rem]
    flex justify-center items-center mx-3  md:mx-auto overflow-y-auto">
      <div className="bg-white rounded-lg border-[1px] border-neutral-200
         2xl:max-w-sm max-w-sm md:mx-auto px-4 py-7
           font-sans shadow-md shadow-gray-50 ">
       <h2 className="text-[18px] md:text-[20px] tracking-wide
       text-center font-bold text-gray-800 2xl:text-[28px]">
       &#128209; Examinations Rule</h2>
       
       <span>
       <span>
    <ul className="pl-5 grid
      py-1.5 mt-3 ">
    {
      <> {examRule.map((i,index)=><li key={i.id} 
      className=" flex items-center cursor-pointer ">
         <div className=" text-center rounded-full flex justify-center
          font-semibold items-center w-7 h-7">
            <p className="text-[16px] p-4 text-variation-500">{index+1}</p>
         </div>
      
         <p className="2xl:text-[16px] text-sm md:text-[16px] 
          text-slate-800 my-2 2xl:my-3 md:mx-4 mx-2 font-sans">
            {i.text}
            </p>  
         
         </li>)}</>
   
    }
    </ul>
    </span>      
        </span>
      
    <div className="w-full mt-4 px-4 ">

    <button onClick={()=> {dispatch(showAction.hideShow())
    } }
     className="rounded-md w-full px-3 py-1.5  text-[14px] md:text-[18px] font-sans
     cursor-pointer bg-variation-500 text-white tracking-wide font-semibold
      active:bg-variation-400 active:shadow-none">
          Got it!
       </button>
    </div>
  
    </div>
      
</section>
}