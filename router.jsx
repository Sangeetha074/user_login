import React from 'react'
import {Routes,Route} from'react-router-dom'
import Signup from './signup'
import Page from './page'
import Form from './form'
import { Home } from './home'
import AuthForm from './AuthForm'
import RegisterForm from './RegisterForm'
import PasswordForm from './passwordForm'

const Router = () => {
    return (
      <div>
        <Routes>
          <Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/AuthForm" element={<AuthForm/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/RegisterForm" element={<RegisterForm/>}></Route>
            <Route path="/page" element={<Page/>}></Route>
            <Route path="/passwordForm" element={<PasswordForm/>}></Route>
            <Route path="/form" element={<Form/>}></Route>
          </Route>
        </Routes>
      
      
      </div>
    )
  }
  export default Router