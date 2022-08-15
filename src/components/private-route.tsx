import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

export const PrivateRoute = ({ authed }: { authed: boolean }) => {
  const location = useLocation()

  return authed ? <Outlet /> : <Navigate to='/login' replace state={{ from: location }} />
}
