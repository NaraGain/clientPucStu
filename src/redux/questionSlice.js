import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../api";

export const getQuiz = createAsyncThunk(
    'quiz/getAsyncQuiz', 
    async (payload) => {
        const response = await axios.post(`${process.env.REACT_APP_API_KEY}quiz`,
         {
            examId : payload.id
         })
         if(response){
            return response.data.result
         }
    }
)

export const getQuestionAsync = createAsyncThunk(
    'quiz/getAsyncQuestion' , async (payload)=> {
        try {
            const response =  await axios.get(`${process.env.REACT_APP_API_KEY}quiz/${payload.sub_id}`)
            if(response) {
                return response.data.quizs
            }
        } catch (error) {
                return error.response
        }   
    }
)

const questionSlice = createSlice ({
    name : "question",
    initialState : {
        subject : [],
        report : [],
        questions : {},
        markPoint : 0,
        pending : false,
        timeOut : false,
    },
        reducers : {
            addReport : (state, action)=>{
                const data = {
                    markPoint : action.payload.markPoint,
                    subjectName : action.payload.subjectName,
                    status : action.payload.status
                }
                const writingData = {
                    subjectName : action.payload.subjectName,
                    formData : action.payload.formData,
                }
                const arr = []
                
                arr.push(data)
                //check dulipcate user add to report
                for (const item of arr){
                    const isDuplicate = state.report
                    .find((obj)=> obj.subjectName === item.subjectName)
                    if(!isDuplicate){
                        state.report.push(item)
                    }
                }
                
            },
            QueryQuestion : (state ,actions)=> {
                const type = actions.payload.type
                    state.questions = 
                    state.subject.find(question => 
                        question.title === type )    
            },

            handleCheckFunc : (state ,actions)=>{
                const value = actions.payload.value
                const check = actions.payload.check
                const question_id = actions.payload.q_Id
                console.log(value , check ,question_id)
                const questionIndex = state.questions.question
                .find(question => question._id == question_id)
                questionIndex.options
                .find(i => i.value === value).isSelect = check
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
            countMarkPoint :(state , action)=>{
                state.markPoint = action.payload.markPoint
            },
            disableState(state){
                state.timeOut = true
            },
        
    },

    extraReducers : {
        [getQuiz.fulfilled] : (state ,action) => {
            state.subject = action.payload         
        },
        [getQuestionAsync.pending] : (state ,action)=>{
            state.pending = true
        },
        [getQuestionAsync.fulfilled] : (state ,action)=> {
            state.questions = action.payload
            state.pending = false
        }

    },
})


export const questionAction = questionSlice.actions
export default questionSlice.reducer