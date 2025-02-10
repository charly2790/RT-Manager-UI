import React from 'react'
import ReactDOM from 'react-dom/client'
import { RTMApp } from './RTMApp'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import { mainTheme } from './themes/mainTheme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
   <ThemeProvider theme={mainTheme}>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <RTMApp />
            <ReactQueryDevtools/>
         </BrowserRouter>
      </QueryClientProvider>
   </ThemeProvider>
)
