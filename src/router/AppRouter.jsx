import React from 'react'
import { Dashboard, LoginForm } from '../pages'
import { Route, Routes } from 'react-router-dom'

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
