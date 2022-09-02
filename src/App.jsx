import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from './theme'
import HomePage from './pages/HomePage/HomePage';
import PostPage from './pages/PostPage/PostPage';
import PerfilPage from './pages/PerfilPage/PerfilPage';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route path='perfil/:user_name' element={<PerfilPage />} />
            <Route path='post/:uuid' element={<PostPage />} />
            <Route index element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
