import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import PerfilPage from './pages/PerfilPage/PerfilPage'
import PostPage from './pages/PostPage/PostPage'

import { AuthProvider, AuthContext } from './contexts/auth'
import { useContext } from 'react'
import CadastroPage from './pages/CadastroPage/CadastroPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import FotoPerfil from './pages/CadastroPage/FotoPerfil'

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
          <Route path="cadastro" element={<CadastroPage />} />
          <Route path="finish/:auth" element={<FotoPerfil />} />
          <Route
            path="/"
            element={
              <Private>
                <HomePage />
              </Private>
            }
          />

          <Route
            path="/explore"
            element={
              <Private>
                <ExplorePage />
              </Private>
            }
          />

          <Route
            path="/:user_name"
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
