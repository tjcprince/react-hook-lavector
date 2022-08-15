import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { store } from '@src/store'
import { AuthPage } from '@src/pages/auth/auth'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthPage>
        <App />
      </AuthPage>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
