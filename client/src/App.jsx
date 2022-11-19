import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'


import Home from './components/Home/index'
import Deshboard from './components/Dashboard/Dashboard'

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} ></Route>
        <Route exact path='/deshb
        oard' element={Deshboard} ></Route>
        <Route exact path='/login' ></Route>
        {/* <Route exact path='/' ></Route> */}
      </Routes>
    </Router>
  )
}

export default App
