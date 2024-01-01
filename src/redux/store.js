
import { configureStore} from "@reduxjs/toolkit"
import answerSlice from "./answerSlice"
import authSlice from "./authSlice"
import loaderSlice from "./loaderSlice"
import apiReducer from "./apicall"
import {TimerSlice} from "./TimerSlice"
import showScoreSlice from "./ShowScore"
import questionSlice from "./questionSlice"
import reportSlice from "./reportSlice"


const store = configureStore({
    reducer:{
        loader:loaderSlice,
        answer: answerSlice,
        auth : authSlice,
        show  : showScoreSlice,
        quizs : apiReducer,
        Time : TimerSlice.reducer,
        question : questionSlice,
        report : reportSlice,
    }
})

export default store

