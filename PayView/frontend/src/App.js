import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import View from './pages/View'
import { useAuthContext } from './hooks/useAuthContext'
import Transaction from './pages/Transaction'
import NotFound from './pages/NotFound'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={<Home />}
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
