import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Navbar from './layout/Navbar/navbar'
import ChangePassword from './pages/changePassword/cahangePassword'
import UpdateProfile from './pages/updateProfile/UpdateProfile'
import StarBackground from './layout/Background/StarBackground'
import { useEffect } from 'react'
import Cookies from "js-cookie";

function App() {
  const { authUser,setAuthUser } = useAuthContext();

  //if cookies dont have "jwt token" remove localstorage user
  useEffect(() => {
    const token = Cookies.get('jwt'); 
    if (!token) {
      localStorage.removeItem("chat-user");
      setAuthUser(null)
    }
  }, []);

  return (
    <>
      <StarBackground />

      <Navbar />

      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={'/login' } />} />
          <Route path='/login' element={authUser ? <Navigate to={"/"}/> : <Login />} />
          <Route path='/change-password' element={authUser ?  <ChangePassword /> : <Navigate to={"/login"}/>} />
          <Route path='/update-profile' element={authUser ?  <UpdateProfile /> : <Navigate to={"/login"}/>} />
          <Route path='/signup' element={authUser ? <Navigate to={"/"}/> : <Signup />} />
        </Routes>
        <Toaster /> 
      </div>
    </>
    
  )
}

export default App
