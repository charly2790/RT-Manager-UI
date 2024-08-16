import React from 'react'
import { Dashboard } from '../pages'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../auth/pages/LoginForm'


export const AppRouter = () => {
  return (
    <>
        <Routes>
            <Route path="/login" element = {
                <LoginForm/>
            }/>
            <Route path="/" element = {
                <Dashboard/>
            }/>
        </Routes>    
    </>
  )
}
