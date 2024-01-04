import { React } from 'react'
import SignUp from './pages/Signup'
import Login from './pages/login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import './App.css';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Dashboard/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
