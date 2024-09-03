import { Alumnos } from '../alumnos/pages/Alumnos'
import { Dashboard } from '../pages'
import { LoginForm } from '../auth/pages/LoginForm'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { Route, Routes } from 'react-router-dom'
import { Sesiones } from '../sesiones/pages'
import React from 'react'


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
            <Dashboard />
          </PrivateRoutes>
        }>
          <Route path="alumnos" element={
            <Alumnos />}
          />
          <Route path="sesiones" element={
            <Sesiones
            />}>

          </Route>
        </Route>

      </Routes>
    </>
  )
}
