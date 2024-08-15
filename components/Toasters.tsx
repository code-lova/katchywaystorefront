"use client"
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

interface ToastersProps {
    children: ReactNode;
}

const Toasters: React.FC<ToastersProps> = ({ children }) => {
  return (
    <>
    <Toaster />
    {children}
    </>
  )
}

export default Toasters