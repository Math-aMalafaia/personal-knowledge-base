
import { Routes, Route } from 'react-router-dom'
import './App.css'
import LivroLista from './components/LivroLista'
import Cadastro from './pages/Cadastro'

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
          element={<h1>Página de Login em construção</h1>}
        />
      </Routes>
    </div>
  )
}

export default App
