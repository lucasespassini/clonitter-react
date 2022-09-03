import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../services/api'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    }

    setIsLoading(false)
  }, [])

  async function login(email, password) {
    const { status, data } = await api.post('/auth/login', {
      email,
      password,
    })

    if (status === 406 || status === 500) {
      console.log('deu ruim')
    } else {
      setUser(data.payload)
      localStorage.setItem('user', JSON.stringify(data.payload))
      localStorage.setItem('token', data.token)
      api.defaults.headers.Authorization = `Bearer ${data.token}`
      navigate('/')
    }
  }

  function logout() {
    console.log('logout')
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = null
    navigate('/login')
  }

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, isLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
