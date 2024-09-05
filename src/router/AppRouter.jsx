import { Alumnos } from '../alumnos/pages/Alumnos'
import { Dashboard } from '../pages'
import { LoginForm } from '../auth/pages/LoginForm'
import { PrivateRoutes } from './PrivateRoutes'
import { PublicRoutes } from './PublicRoutes'
import { Route, Routes } from 'react-router-dom'
import { Sesiones, SesionesAdmin } from '../sesiones/pages'
import React from 'react'
import { SesionesPrueba } from '../sesiones/pages/SesionesPrueba'


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
            <Route path="/sesionesAdmin" element={
              // <SesionesAdmin/>
              <SesionesPrueba/>
              }>
            </Route>
          </Route>
        </Route>      
    </Routes >
    </>
  )
}
