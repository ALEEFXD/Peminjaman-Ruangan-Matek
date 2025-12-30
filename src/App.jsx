import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Peminjaman from './components/Peminjaman.jsx';
import Pengajuan from './components/Pengajuan.jsx'; 
import Login from './components/Login.jsx';
import { AuthProvider } from './components/AuthProvider.jsx';
import ProtectedRouteSiswa from './components/ProtectedRoute.jsx';
import MainLayout from './MainLayout.jsx';
import './App.css'

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRouteSiswa />}>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Peminjaman />} />
                <Route path="/pengajuan" element={<Pengajuan />} />
              </Route>
            </Route> 
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App  
