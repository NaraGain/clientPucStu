import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const   initialState = {
    subject : [],
    report : [],
    questions : {},
    userAnswer : {},
    markPoint : 0,
    pending : false,
    timeOut : false,
}
const questionSlice = createSlice ({
    name : "question",
    initialState,
        reducers : {
            addQuestion : (state ,actions)=>{
                return {
                    ...state,
                    subject : actions.payload.question
                }
            },
            QueryQuestion : (state ,actions)=> {
                const type = actions.payload.type
                state.questions = state.subject.find(name => name.title == type)
            },
            handleChangeBlank : (state,actions)=>{
                const updateSectionBlank = state.subject.map((section)=>{
                    if(section.title === actions.payload.title){
                        const questionBlank = section.question.map((question)=>{
                            if(question._id === actions.payload.qid){
                                if(question.name === "Blank" || question.name === "writing"){
                                    return {
                                        ...question,
                                        onAnswer : true,
                                        markPoint : actions.payload.markPoint,
                                        userAnswer : actions.payload.answer,
                                    }
                                }
                            }
                            return {
                                ...question,
                            }

                        })
                        return {
                            ...section,
                            progress : questionBlank.filter((question) => question?.onAnswer == true).length,
                            question : questionBlank
                        }
                    }
                    return {
                        ...section
                    }
                })
                return {
                    ...state,
                    subject : updateSectionBlank
                }
            },
            handleCheckBox: (state , actions)=>{
               const updateSection = state.subject.map((section)=> {
                if(section.title === actions.payload.title){
                 const question  = section.question.map((question)=> {
                        if(question._id === actions.payload.qid){
                            const optionsUpdate = question.options.map((options)=> {
                                if(options.value === actions.payload.value){
                                    return {
                                        ...options,
                                        isSelect : !actions.payload.isChecked
                                    }
                                } 
                                return {
                                    ...options
                                }
                            })
                            return {
                                ...question,
                                onAnswer : true,
                                markPoint : actions.payload.currentMarkPoint,
                                options : optionsUpdate
                            }
                        }
                        return {...question}
                    })
                    return {
                        ...section,
                        progress : question.filter((question)=> 
                        question.onAnswer === true).length,
                        question : question
                    }
    
                }
                return {
                    ...section,
                }
               })
               return {
                ...state,
                subject : updateSection,

               }
            },
            addReport : (state, action)=>{
                const data = {
                    markPoint : action.payload.markPoint,
                    subjectName : action.payload.subjectName,
                    status : action.payload.status
                }
                const arr = []
                
                arr.push(data)
                //check dulipcate user add to report
                for (const item of arr){
                    const isDuplicate = state.report
                    .findIndex((obj)=> obj.subjectName === item.subjectName)
                    if(isDuplicate !== -1){
                        state.report[isDuplicate] = item
                    }else{
                        state.report.push(item)
                    }
                }
                
            },
            addWritingToReport : (state,action)=>{
                const dataWriting = {
                    subjectName : action.payload.subjectName,
                    formData : action.payload.formData,
                }

                const arr = []
                arr.push(dataWriting)
                for (const item of arr){
                    const isDuplicate = state.report.find(obj =>
                         obj.subject == item.subjectName)
                    if(!isDuplicate) {
                        state.report.push(item)
                    }
                }
            },
            countMarkPoint :(state , actions)=>{
                let markPoint = actions.payload.markPoint
                let toalPoints = 0
                state.markPoint =+ markPoint
        
            },
            disableState(state){
                state.timeOut = true
            },
        
    },
})


export const questionAction = questionSlice.actions
export default questionSlice.reducer