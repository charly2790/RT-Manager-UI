import React from 'react'
import { Dashboard } from '../pages'
import { Route, Routes } from 'react-router-dom'
import { LoginForm } from '../auth/pages/LoginForm'
import { Alumnos } from '../alumnos/pages/Alumnos'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'


export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={
          <PublicRoutes>
            <LoginForm />
          </PublicRoutes>
        } />
        <Route path="/" element={
          <PrivateRoutes>
            <Dashboard/>
          </PrivateRoutes>
        }>                    
          <Route path="alumnos" element={
            <Alumnos />}
          />
        </Route>

      </Routes>
    </>
  )
}
