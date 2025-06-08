import React from 'react'
import {Routes,Route} from'react-router-dom'
import Signup from './signup'
import Register from './register'
import Page from './page'
import Password from './password'
import Form from './form'
import { Home } from './home'
import Loginpage from './loginpage'

const Router = () => {
    return (
      <div>
        <Routes>
          <Route>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/" element={<Loginpage/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/page" element={<Page/>}></Route>
            <Route path="/password" element={<Password/>}></Route>
            <Route path="/form" element={<Form/>}></Route>
          </Route>
        </Routes>
      
      
      </div>
    )
  }
  export default Router