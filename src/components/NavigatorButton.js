import { Button } from "antd";
import React, { Children, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function NavigatorButton ({children , style}){
    const navigator = useNavigate()
    return <>
        <Button className={style} 
        onClick={()=> navigator(-1 ,{replace : true})}>
                {children}
        </Button>
    
    </>
}