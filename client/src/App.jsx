import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Dashboard from "./components/Dashboard/Dashboard"

function App() {
  const [count, setCount] = useState(0)

  return (
        <Dashboard />
  )
}

export default App
