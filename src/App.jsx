import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Allroutes from './Route/Routes'

function App() {
  
  return (
    <>
       <Router>
    <Routes>
     <Route path="/" element={<Homepage />} />
      <Route path='/*' element={<Allroutes />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
