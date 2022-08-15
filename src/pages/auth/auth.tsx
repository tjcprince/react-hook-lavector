import React from 'react'
import { ReactNode, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, selectUserStatus } from '@src/pages/auth/auth.slice'
import { LoadingPage, FallbackPage } from '@src/components/tools-page'
import { AppDispatch } from '@src/store/index'

export const AuthPage = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  const userStatus = useSelector(selectUserStatus)
  if (userStatus === 'pending') {
    return <LoadingPage />
  }

  if (userStatus === 'rejected') {
    return <FallbackPage error={new Error('授权发生异常错误')} />
  }

  if (userStatus === 'fulfilled') {
    return <div style={{ height: '100%' }}>{children}</div>
  }

  return <div></div>
}
