import axios from 'axios'
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
    user_nameError: '',
    nameError: '',
    emailError: '',
    passwordError: '',
  })
  const [errouUser_name, setErrouUser_name] = useState(false)
  const [errouName, setErrouName] = useState(false)
  const [errouEmail, setErrouEmail] = useState(false)
  const [errouSenha, setErrouSenha] = useState(false)

  useEffect(() => {
    const recoveredUser = localStorage.getItem('user')
    const recoveredToken = localStorage.getItem('token')

    if (recoveredUser) {
      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`
      setUser(JSON.parse(recoveredUser))
    }

    setIsLoading(false)
  }, [])

  async function signin(email, password) {
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
      const errors = error.response.data.errors
      if (!errors.emailError) setErrouEmail(false)
      if (!errors.passwordError) setErrouSenha(false)

      if (errors.emailError) setErrouEmail(true)
      if (errors.passwordError) setErrouSenha(true)
      setErrors(errors)
    }
  }

  async function signup(profile_image, user_name, name, email, password) {
    try {
      const { data } = await axios({
        method: 'post',
        url: process.env.REACT_APP_BASE_URL + '/auth/signup',
        data: {
          profile_image,
          user_name,
          name,
          email,
          password,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      setUser(data.payload)
      localStorage.setItem('user', JSON.stringify(data.payload))
      localStorage.setItem('token', data.token)
      api.defaults.headers.Authorization = `Bearer ${data.token}`
      const p1 = Math.floor(Math.random() * (999 - 100) + 100)
      const p2 = Math.floor(Math.random() * (999 - 100) + 100)
      const p3 = Math.floor(Math.random() * (999 - 100) + 100)
      const auth = `${p1}-${p2}-${p3}`
      localStorage.setItem('@finish-auth', auth)
      navigate(`/finish/${auth}`)
    } catch (error) {
      const errors = error.response.data.errors
      if (!errors.user_nameError) setErrouUser_name(false)
      if (!errors.nameError) setErrouName(false)
      if (!errors.emailError) setErrouEmail(false)
      if (!errors.passwordError) setErrouSenha(false)

      if (errors.user_nameError) setErrouUser_name(true)
      if (errors.nameError) setErrouName(true)
      if (errors.emailError) setErrouEmail(true)
      if (errors.passwordError) setErrouSenha(true)
      setErrors(errors)
    }
  }

  function logout() {
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
        signin,
        signup,
        logout,
        errouUser_name,
        errouName,
        errouEmail,
        errouSenha,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
