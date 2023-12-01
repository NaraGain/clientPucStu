import React from "react";
import { VocabularyCard } from "./VocabularyCard";
import Audio from "./Audio";
import { ReadingCard } from "./ReadingCard";
export default function QuestionHeader({type,item}){
    return (
       <div>
{
     type === "listening" && (
        <Audio audio={item.audio} title="my hoilday in london" ></Audio>
    ) ||   type == "reading" && (
        <ReadingCard type={item.categorie} 
        header={item.header} 
         sentence={item.text}  />
     ) || type == "vocabulary" && (
     
     <VocabularyCard clude={item.clude}/>
     ) 
}
        </div>
    )
        
}