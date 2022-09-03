import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import PerfilPage from './pages/PerfilPage/PerfilPage'
import PostPage from './pages/PostPage/PostPage'

import { AuthProvider, AuthContext } from './contexts/auth'
import { useContext } from 'react'

export default function AppRoutes() {
  function Private({ children }) {
    const { authenticated, isLoading } = useContext(AuthContext)

    if (isLoading) return <div>Carregando...</div>
    if (!authenticated) return <Navigate to="/login" />

    return children
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />
          <Route
            path="perfil/:user_name"
            element={
              <Private>
                <PerfilPage />
              </Private>
            }
          />
          <Route
            path="post/:uuid"
            element={
              <Private>
                <PostPage />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
