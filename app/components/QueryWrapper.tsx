"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"

const queryClient = new QueryClient()

interface QueryWrapperProps {
  children : ReactNode
}

const QueryWrapper:React.FC<QueryWrapperProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  ) 
}

export default QueryWrapper
