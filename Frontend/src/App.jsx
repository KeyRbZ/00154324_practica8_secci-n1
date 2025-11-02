import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [backendMessage, setBackendMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const testBackendConnection = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:5000/')
      setBackendMessage(response.data.message)
    } catch (error) {
      setBackendMessage('❌ Error conectando al backend')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testBackendConnection()
  }, [])

  return (
    <div className="App">
      <h1>Frontend React - Práctica 8</h1>
      <div className="card">
        <h2>Estado de la conexión:</h2>
        {loading ? (
          <p>🔌 Conectando al backend...</p>
        ) : (
          <p>{backendMessage}</p>
        )}
        <button onClick={testBackendConnection} disabled={loading}>
          {loading ? 'Probando...' : 'Probar Conexión'}
        </button>
      </div>
    </div>
  )
}

export default App