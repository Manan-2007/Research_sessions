import { useState } from 'react'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const increment = () => setCount(count + 1)
  const decrement = () => setCount(count - 1)
  const reset = () => setCount(0)

  return (
    <div className="app">
      <h1 className="title">Simple Counter</h1>
      <div className="counter-value">{count}</div>

      <div className="controls">
        <button className="btn" onClick={decrement} aria-label="decrement">Decrement</button>
        <button className="btn primary" onClick={increment} aria-label="increment">Increment</button>
        <button className="btn reset" onClick={reset} aria-label="reset">Reset</button>
      </div>
    </div>
  )
}

export default App
