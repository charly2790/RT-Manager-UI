import { Alumnos } from '../alumnos/pages/Alumnos'
import { Carreras } from '../carreras'
import { Settings } from '../ajustes'
import { Dashboard } from '../components'
import { LoginForm } from '../auth/pages/LoginForm'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { Route, Routes } from 'react-router-dom'
import { Sesiones, SesionesAdmin } from '../sesiones'
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
            />}/> 
          <Route path="sesiones-admin" element={              
              <SesionesAdmin
            />}/>
          <Route path="calendario-carreras" element={              
              <Carreras
            />}/>
          <Route path="settings" element={              
              <Settings
            />}/>
        </Route>      
    </Routes >
    </>
  )
}
