import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { theme } from './theme'
import HomePage from './pages/HomePage/HomePage';
import Perfil from './pages/Perfil/Perfil';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path='perfil' element={<Perfil />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
