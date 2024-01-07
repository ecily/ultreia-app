import React from 'react'
import { useSelector } from "react-redux"
//outlet zeigt die children aus app.jsx in diesem fall die profile page
import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to ="/sign-in" />
}
