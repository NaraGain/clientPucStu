import { createSlice } from "@reduxjs/toolkit";


//post to class
const initialState = {
    ans : [],
}

const answerSlice = createSlice({
    name: "answer",
   initialState,
    reducers:{
       addAnswer: (state, action)=>{
        const ans = {
            id : action.payload.id,
            question : action.payload.question,
            completed : action.payload.completed
        }

            state.ans.push(ans)
       }
    }
})


export const {addAnswer} = answerSlice.actions
export default answerSlice.reducer;