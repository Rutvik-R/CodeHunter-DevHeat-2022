import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'
import Dashboard from "./components/Dashboard/Dashboard"


import Home from './components/Home/index'
import Deshboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} ></Route>
        <Route exact path='/dashboard' element={ <Dashboard />} ></Route>
      </Routes>
    </Router>
  )
}

export default App
