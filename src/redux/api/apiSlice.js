import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const examApi = createApi({
  reducerPath : 'examApi',
  baseQuery : fetchBaseQuery({baseUrl : "https://jsonplaceholder.typicode.com/todos"}),
  endpoints : (builder)=>({
  getAllExam : builder.query({
    query : ()=> 'exam',
  })

  })
})



export const {useGetAllExamQuery} = examApi
