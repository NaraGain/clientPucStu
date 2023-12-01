import { createSlice } from "@reduxjs/toolkit";

const showScoreSlice = createSlice({
    name : 'show',
    initialState : {
        isShow : ''
    },
    reducers : {
        onShow : (state,actions)=>{
            state.isShow = false
        },
        hideShow(state){
            state.isShow = true
        }
    }
})


export const showAction = showScoreSlice.actions
export default showScoreSlice.reducer