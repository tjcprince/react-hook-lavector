import React from 'react'

import { Form, Input, Button } from 'antd'

import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { getUser, login } from '@src/pages/auth/auth.slice'
import { AppDispatch } from '@src/store/index'

export const LoginScreen = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const location = useLocation()
  const onFinish = (values: { username: string; password: string }) => {
    dispatch(login(values)).then(() => {
      dispatch(getUser())
      const state = location.state
      navigate(state ? state.from.pathname : '/page1')
    })
  }

  return (
    <Form onFinish={onFinish}>
      <Form.Item name={'username'}>
        <Input placeholder={'用户名'} type='text' id={'username'} />
      </Form.Item>
      <Form.Item name={'password'}>
        <Input placeholder={'密码'} type='password' id={'password'} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          登录
        </Button>
      </Form.Item>
    </Form>
  )
}
