import { createSlice } from "@reduxjs/toolkit";




const reportSlice = createSlice({
    name : 'report',
    initialState : {
        'user' : "",
        'exam' : "",
        'course': "",
        'result' : {},

    },
    reducers : {
            addReportToDb:(state ,actions)=>{
                state.user = actions.payload.user
                state.exam = actions.payload.exam
                state.course = actions.payload.course
                state.result = actions.payload.result
            }
    },
})


export const reportAction = reportSlice.actions
export default reportSlice.reducer