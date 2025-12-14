import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="app-container">
      <div className="app">
        <div className="header">
          <h1 className="title">Counter</h1>
          <p className="subtitle">Click to increment or decrement</p>
        </div>
        
        <div className="counter-section">
          <div className="counter-display">
            <div className="counter-value">{count}</div>
          </div>
        </div>

        <div className="controls">
          <button className="btn btn-secondary" onClick={decrement} aria-label="decrement">
            <span>−</span>
          </button>
          <button className="btn btn-primary" onClick={increment} aria-label="increment">
            <span>+</span>
          </button>
          <button className="btn btn-reset" onClick={reset} aria-label="reset">
            <span>↻</span>
          </button>
        </div>
      </div>
      
      <div className="background-blur"></div>
    </div>
  )
}

export default App
