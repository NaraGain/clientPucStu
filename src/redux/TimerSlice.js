import { createSlice } from "@reduxjs/toolkit";



export const TimerSlice = createSlice({
    name : "Time",
    initialState:{
        minute : 0,
        seconds : 0,
        disable:false
    },

    reducers: {
       disable: (state ,action)=>{
          if (action.payload.minute === 0){
            state.disable = false
          }else{
            state.disable = true
          }
       }

       
    }
})


export const TimerAction = TimerSlice.actions
export default TimerSlice