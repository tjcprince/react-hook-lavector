import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User } from '@src/types/User'
import { Auth } from '@src/types/Auth'
import { RootState } from '@src/store/index'

import { apiPost, apiGet } from '@src/utils/http'

//localhost: 8080 / authorize / token;
// {
//     "accessToken": "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJsYXZlY3RvciIsInN1YiI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiLCJST0xFX1NUQUZGIiwiVVNFUl9BRE1JTiIsIlVTRVJfQ1JFQVRFIiwiVVNFUl9VUERBVEUiLCJST0xFX0FETUlOIiwiVVNFUl9SRUFEIl0sImlhdCI6MTYyODE1NTg2NiwiZXhwIjoxNjI4MTU2MTY2fQ.TQJimZ6uFqznDuopcl2DEs2pH1a_BCc9oH8eC8vIyOpIx8jW9GZ1EYGrGRL9PXaipnLHCr33KB4oKo9dlj6mFg",
//     "refreshToken": "eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJsYXZlY3RvciIsInN1YiI6InVzZXIiLCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiLCJST0xFX1NUQUZGIiwiVVNFUl9BRE1JTiIsIlVTRVJfQ1JFQVRFIiwiVVNFUl9VUERBVEUiLCJST0xFX0FETUlOIiwiVVNFUl9SRUFEIl0sImlhdCI6MTYyODE1NTg2NiwiZXhwIjoxNjMwNzQ3ODY2fQ.Q2mZ27iTIBwd7FxjTLeBzBBDt-Di63qOc-DWzWD28V1wm-2Ny-4_PMrzFd0AVf8d9vWV2A-j7oNCosOJaRvLdg"
// }

// {
//       username: "user",
//       password: "12345678",
//     }

export const login = createAsyncThunk(
  'auth/login',
  async (data: { username: string; password: string }) => {
    const response = await apiPost('auth/login', data)

    if (response.data.status === 1000) {
      window.localStorage.setItem('accessToken', response.data.data.accessToken || '')
      window.localStorage.setItem('refreshToken', response.data.data.refreshToken || '')
    }

    return response.data.data
  }
)

export const getUser = createAsyncThunk('auth-center/api/me', async data => {
  const response = await apiGet('auth-center/api/me')
  return response.data
})

interface State {
  user: User | null
  userStatus: string
  auth: Auth | null
}

const initialState: State = {
  user: null,
  userStatus: 'idle',
  auth: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state.auth = action.payload
    },
  },

  extraReducers: {
    [login.pending.type]: (state, action) => {
      state.auth = null
    },
    [login.fulfilled.type]: (state, action) => {
      state.auth = action.payload.data
    },
    [login.rejected.type]: (state, action) => {
      state.auth = null
    },

    [getUser.pending.type]: (state, action) => {
      state.user = null
      state.userStatus = 'pending'
    },
    [getUser.fulfilled.type]: (state, action) => {
      state.user =
        action.payload.status && action.payload.status === 2004 ? null : action.payload.data
      state.userStatus = 'fulfilled'
    },
    [getUser.rejected.type]: (state, action) => {
      state.user = null
      state.userStatus = 'rejected'
    },
  },
})

export const { setAuth } = authSlice.actions

export const selectAuth = (state: RootState) => state.auth.auth
export const selectUser = (state: RootState) => state.auth.user
export const selectUserStatus = (state: RootState) => state.auth.userStatus
export default authSlice.reducer
