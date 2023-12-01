import React from "react";
import Icon from "./Icon";


export default function Header({text, icons}){
        return <h1 className="text-lg text-purple-900 flex items-center gap-2">
             <Icon Size={"1.2rem"} name={icons} />
            {text}</h1>
}