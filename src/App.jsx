import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Peminjaman from './components/Peminjaman.jsx';
import Login from './components/Login.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Peminjaman />} />
            </Route> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App  
