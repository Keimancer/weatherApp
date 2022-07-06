import { useState } from 'react'
import './App.css'
import APIFetch from './components/APIFetch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <APIFetch />
    </div>
  )
}

export default App
