import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@src/pages/auth/auth.slice'
import { Home } from '@src/pages/home'
import { PrivateRoute } from '@src/components/private-route'
import { LoginScreen } from '@src/pages/auth/login'

import '@src/App.css'

function App() {
  const user = useSelector(selectUser)
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path='/' element={<PrivateRoute authed={user ? true : false} />}>
            <Route path='/' element={<Navigate to='/home/page1' />} />
            <Route path='/home/*' element={<Home />} />
          </Route>
          <Route path='/login' element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
