import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage'
import Allroutes from './Route/Routes'
import NavBar from './Components/Nav'

function App() {
  
  return (
    <>
       <Router>
       <NavBar/>
       <Routes>
     <Route path="/" element={<Homepage />} />
      <Route path='/*' element={<Allroutes />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
