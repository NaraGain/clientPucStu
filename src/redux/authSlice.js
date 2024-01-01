import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name : "auth",
    initialState:{
        isLogIn: false,
        userId : '',
    },
    reducers : {
        userInof:(state ,action)=>{
            state.userId = action.payload.id
        },
        login(state){
            state.isLogIn = true
        },
        logout(state) {
            state.isLogIn = false
         }
    },

   
})


export const authAction = authSlice.actions
export default authSlice.reducer