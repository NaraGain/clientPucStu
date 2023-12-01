import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    loadding : false,
    pending : false,
    task : [],
    questions : null,
    page : 1,
    Error : null,
}


export const getQuestionAsync = createAsyncThunk("quiz/getQuestionAsync",
async (state)=> {
    const quiz = await axios("http://localhost:7000/todos").then((respones)=> {
        return respones.data 
    })

    if(!quiz) {
        return  "Not Found"
    }

    return {quiz}

   
}
)

export const toggleCompleteAsync = createAsyncThunk(
	'todos/completeTodoAsync',
	async (payload) => {
		const resp = await fetch(`http://localhost:7000/todos/${payload.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ completed: payload.completed }),
		});

		if (resp.ok) {
			const todo = await resp.json();
			return { todo };
		}
	}
);

export const getQuestionNameAsync =
 createAsyncThunk("quiz/getQuestionNameAsync",
 async(payload)=> {
    const quizName = await axios.get(`http://localhost:7000/todos/${payload.name}`).then((respone)=>{
        return respone.data
    })
    
if (!quizName){
    console.log("Not Found")
}
    return {quizName}

})

export const getQuestionNameAsyncID = createAsyncThunk("quiz/getQuestionNameAsyncID", 
async(payload)=> {
    const quizID = await axios.get(`http://localhost:7000/todos/${payload.name}?qid=${payload.page}`).then((respone)=>{
        return respone.data
    })


    if(!quizID){
        console.log("Not found page")
    }

    return {quizID}
        
})




export const apiCallSlics = createSlice({
    name : "quiz",
    initialState,
    reducers : {

        loadding : (state) =>{
                state.loadding =true
        },

        addTodo: (state, action) => {
			const todo = {
				id: new Date(),
				title: action.payload.title,
				completed: false,
			};
			state.push(todo);
		}
    },
    increment: (state) => {
        state.page += 1
      },

    decrement: (state) => {
        state.page -= 1
      },


    extraReducers: {
 [getQuestionAsync.pending] : (state)=>{
            state.pending = true
        },

[getQuestionAsync.fulfilled] : (state, action) => {
            state.pending = false
            state.task = action.payload.quiz
        },
[getQuestionAsync.rejected] : (state)=>{
    console.log("rejected fetching")
},


[getQuestionNameAsync.pending] : (state)=>{
    state.pending = true
}
,

[getQuestionNameAsync.fulfilled] : (state, action) => {
    state.pending = false
    state.questions = action.payload.quizName
},
[getQuestionNameAsync.rejected] : (state)=>{
    state.pending = true
},

[getQuestionNameAsyncID.fulfilled] : (state,action)=>{
 state.questions = action.payload.quizID
},

[toggleCompleteAsync.fulfilled] : (state ,action) => {
    const index = state.questions.findIndex((i) => 
    i.id ===  action.payload.todo.completed )
    state[index].completed = action.payload.todo.completed

        }
    }
})


export const {addTodo, loadding,increment,decrement} = apiCallSlics.actions
export default apiCallSlics.reducer