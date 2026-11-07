
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LivroLista from './components/LivroLista'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<LivroLista />} />

        <Route
          path='/cadastro'
          element={<Cadastro />} />

        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </div>
  )
}

export default App
