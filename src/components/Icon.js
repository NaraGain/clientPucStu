import React from "react";
import { IconContext } from "react-icons/lib";


export default function Icon ({name,Size,color}){

    return<>
    <IconContext.Provider value={{color:`${color}`,size:`${Size}`}}>
     {name}
    </IconContext.Provider>
    </>

}