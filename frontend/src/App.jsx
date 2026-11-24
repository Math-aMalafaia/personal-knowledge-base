import { Routes, Route } from 'react-router-dom'
import './App.css'

import LivroLista from './components/LivroLista'
import ProtectedRoute from './components/ProtectedRoute'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Home from './pages/Home'
import Perfil from './components/Perfil'
import Admin from './pages/Admin'

function App() {
  return (
    <div className='app'>
      <Routes>

        <Route 
          path='/'
          element={<Home />}/>

        <Route
          path='/admin'
          element={
            <ProtectedRoute exigirAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }/>

        <Route
          path='/biblioteca'
          element={
            <ProtectedRoute>
              <LivroLista />
            </ProtectedRoute>
          }/>

        <Route
          path='/perfil'
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          }/>

        <Route
          path='/cadastro'
          element={<Cadastro />}/>

        <Route
          path='/login'
          element={<Login />}/>

      </Routes>
    </div>
  )
}

export default App
