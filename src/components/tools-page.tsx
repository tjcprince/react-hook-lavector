import styled from '@emotion/styled'
import React from 'react'
import { Spin, Alert, Button } from 'antd'
import { FallbackProps } from 'react-error-boundary'
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
export const LoadingPage = () => {
  return (
    <CenterDiv>
      <Spin size={'large'} />
    </CenterDiv>
  )
}

export const FallbackPage = ({ error }: { error: Error }) => {
  return <Alert message='Error' description={error.message} type='error' showIcon />
}

export const FallbackResetPage = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Alert
      message='Error Text'
      showIcon
      description={error.message}
      type='error'
      action={
        <Button size='small' onClick={resetErrorBoundary} danger>
          重试
        </Button>
      }
    />
  )
}
