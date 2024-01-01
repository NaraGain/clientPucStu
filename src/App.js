import React, { useEffect, useState } from 'react'
import LoginForm from "./page/login/loginForm"
import {Routes, Route,useLocation, Outlet} from 'react-router-dom'
import ErrorPage from './components/ErrorPage';
import { ProtectedRoute } from './auth/ProtectedRoute'
import { File } from './test/File'
import { Render } from './test/Render'
import {QuestionRender} from "./page/exam/component/QuestionRender";
import { useSelector } from 'react-redux'
import { Loader } from './components/load/Loader'
import { GetHelpWithSigning } from './page/login/resetAccount'
import { ExamLayout } from './layout/ExamLayout'
import  Exam from "./page/exam/exam"
import Main from './page/main/main';
const LazyLoader = React.lazy(()=> import("./layout/ExamLayout"))


const App =()=>{
const location = useLocation()
const loading = useSelector((state)=> state.loader.loading)
 


  useEffect(()=>{
  const title  = location.pathname.slice(1,
                location.pathname.length)
  const getTitle =  title.replace("/", " - ")
  document.title = getTitle
  },[location.pathname])

  return <div className='App'>
 { loading && <><Loader/></>}  
<Routes>

     <Route path="/" element={<LoginForm/>}></Route>
      <Route path='/login'
      element={<LoginForm/>}/> 
      <Route path='/login/reset-account' element={<GetHelpWithSigning/>}/>
    
      
    <Route path='/'  errorElement={<ErrorPage/>} 
    element={<ProtectedRoute><ExamLayout/></ProtectedRoute>} >
      <Route path='/main' element={<ProtectedRoute><Main/></ProtectedRoute>}/>
      <Route path='/exam' element={<Exam/>}></Route>
      <Route path='/exam/:name' element={<QuestionRender/> }></Route>
      </Route>
    {/* Error page not found */}
    <Route path='/*' element={<ErrorPage ></ErrorPage>}/>
     
     {/*tesfile*/}
     <Route path='/' errorElement={<ErrorPage/>} element={<>
      <nav className=''></nav>
      <Outlet></Outlet>
     </>}>
     <Route path='/file' errorElement={<ErrorPage/>} element ={<File/>}></Route>
     <Route path='/file/:name' errorElement={<ErrorPage/>} element ={<Render/>}></Route>  
     </Route>
   

   </Routes>





  </div>
}


export default App;
