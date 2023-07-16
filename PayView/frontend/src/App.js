import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import View from './pages/View'
import { useAuthContext } from './hooks/useAuthContext'
import Transaction from './pages/Transaction'
import NotFound from './pages/NotFound'
import FullHistory from './pages/FullHistory'
import Homepage from './components/Homepage'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <NavBar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={!user ? <Homepage /> : <Navigate to="/view"/>}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/"/>}
            />
            <Route 
              path="/view"
              element={!user ? <Login /> : <View />}
            />
            <Route
              path="/transaction"
              element={!user ? <Login /> : <Transaction />}
            />
            <Route 
              path="/fullhistory"
              element={!user ? <Login /> : <FullHistory />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
