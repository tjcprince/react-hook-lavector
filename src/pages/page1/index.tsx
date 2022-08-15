import React from 'react'
import { Button } from 'antd'
import styled from '@emotion/styled'
import { FallbackResetPage } from '@src/components/tools-page'
import { ErrorBoundary } from 'react-error-boundary'
const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
const Page1 = () => {
  return (
    <ErrorBoundary FallbackComponent={FallbackResetPage}>
      <BuggyCounter />
      <CenterDiv>
        page111111222222
        <Button type='primary'>Primary Button</Button>
      </CenterDiv>
    </ErrorBoundary>
  )
}

class BuggyCounter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { counter: 0 }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }))
  }

  render() {
    if (this.state.counter === 2) {
      // Simulate a JS error
      throw new Error('I crashed!哈哈哈哈哈哈')
    }
    return <button onClick={this.handleClick}>{this.state.counter}</button>
  }
}
export default Page1
