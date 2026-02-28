import { useState } from 'react'
import './App.css'
import Header from './components/Header/header'
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home/home';
import Footer from './components/Footer/footer';
import Login from './pages/Login/login';
import Stock from './pages/Stock/stock';
import AdminDashboard from './pages/Admin/Dashboard/adminDashboard';
import RegisterStudent from './pages/Admin/RegisterStudent/registerStudent';
import ManageMedicine from './pages/Admin/ManageMedcine/manageMedicine';
import Record from './pages/Admin/Records/record';
import Facility from './pages/Admin/Facility/facility';
import NearByHospital from './pages/Admin/NearByHospital/nearByHospital';
import AdminGallary from './pages/Admin/Gallary/adminGallary';
import StudentDashboard from './pages/Student/studentDashboard';
import GlobalLoader from './components/GlobalLoader/globalLoader';

function App() {
  const [loader, setLoader] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin"));

  // ✅ FIX: userInfo (which holds role + id) is now React STATE, not a plain variable.
  // Before: role/id were read from localStorage with plain `let` — so after login,
  // isLogin updated but role was still null in that same render → redirected to "/"
  // Now: all auth info updates together in one render cycle, routes work correctly.
  const [userInfo, setUserInfo] = useState(() => {
    try {
      const stored = localStorage.getItem("userInfo");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const role = userInfo?.role || null;
  const id = userInfo?._id || null;

  // ✅ FIX: handleLogin now also reads and sets userInfo from localStorage after login.
  // Before: it only called setIsLogin(value), leaving role as null → route guard blocked admin.
  const handleLogin = (value) => {
    setIsLogin(value);
    if (value) {
      try {
        const stored = localStorage.getItem("userInfo");
        setUserInfo(stored ? JSON.parse(stored) : null);
      } catch {
        setUserInfo(null);
      }
    } else {
      setUserInfo(null);
    }
  }

  const showLoader = () => { setLoader(true); }
  const hideLoader = () => { setLoader(false); }

  // ✅ FIX: isAdmin now also checks role is not null, preventing unauthenticated access
  const isAdmin = isLogin && role && role !== 'student';
  const isStudent = isLogin && role === 'student';

  return (
    <div className='App'>
      <Header isLogin={isLogin} showLoader={showLoader} handleLogin={handleLogin} hideLoader={hideLoader} />
      <Routes>
        <Route path='/' element={<Home showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route
          path='/login'
          element={
            isLogin
              ? isStudent
                ? <Navigate to={`/student/${id}`} />
                : <Navigate to={'/admin/dashboard'} />
              : <Login handleLogin={handleLogin} showLoader={showLoader} hideLoader={hideLoader} />
          }
        />
        <Route path='/stock' element={<Stock showLoader={showLoader} hideLoader={hideLoader} />} />
        <Route path='/admin/dashboard'        element={isAdmin ? <AdminDashboard showLoader={showLoader} hideLoader={hideLoader} />   : <Navigate to="/" />} />
        <Route path='/admin/register-student' element={isAdmin ? <RegisterStudent showLoader={showLoader} hideLoader={hideLoader} />   : <Navigate to="/" />} />
        <Route path='/admin/manage-medicine'  element={isAdmin ? <ManageMedicine showLoader={showLoader} hideLoader={hideLoader} />    : <Navigate to="/" />} />
        <Route path='/admin/records'          element={isAdmin ? <Record showLoader={showLoader} hideLoader={hideLoader} />            : <Navigate to="/" />} />
        <Route path='/admin/facility'         element={isAdmin ? <Facility showLoader={showLoader} hideLoader={hideLoader} />          : <Navigate to="/" />} />
        <Route path='/admin/near-by-hospital' element={isAdmin ? <NearByHospital showLoader={showLoader} hideLoader={hideLoader} />    : <Navigate to="/" />} />
        <Route path='/admin/gallary'          element={isAdmin ? <AdminGallary showLoader={showLoader} hideLoader={hideLoader} />      : <Navigate to="/" />} />
        <Route path='/student/:id'            element={isStudent ? <StudentDashboard showLoader={showLoader} hideLoader={hideLoader} /> : <Navigate to="/" />} />
      </Routes>
      <Footer />
      {loader && <GlobalLoader />}
    </div>
  )
}

export default App
