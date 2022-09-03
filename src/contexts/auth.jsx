import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { api } from '../services/api'
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [errors, setErrors] = useState({
    emailError: '',
    passwordError: '',
  })
  const [errouEmail, setErrouEmail] = useState(false)
  const [errouSenha, setErrouSenha] = useState(false)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser))
    }

    setIsLoading(false)
  }, [])

  async function login(email, password) {
    try {
      const { data } = await api.post('auth/login', {
        email,
        password,
      })

      setUser(data.payload)
      localStorage.setItem('user', JSON.stringify(data.payload))
      localStorage.setItem('token', data.token)
      api.defaults.headers.Authorization = `Bearer ${data.token}`
      navigate('/')
    } catch (error) {
      const erros = error.response.data.errors
      if (!erros.emailError) setErrouEmail(false)
      if (!erros.passwordError) setErrouSenha(false)
      if (erros.emailError) setErrouEmail(true)
      if (erros.passwordError) setErrouSenha(true)
      setErrors(error.response.data.errors)
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
      value={{
        authenticated: !!user,
        user,
        isLoading,
        login,
        logout,
        errouEmail,
        errouSenha,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
