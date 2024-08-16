import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context'

export const RTMApp = () => {
  return (
    <AuthProvider>
      <AppRouter/>
    </AuthProvider>
  )
}
