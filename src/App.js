import { Routes, Route } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HomePage, ProfilePage, Category, OffersPage, SignupPage, LoginPage, ForgotPassword } from "./pages"
import { Navbar, PrivateRoute } from "./components";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Navbar />
      <ToastContainer />      
    </>
  );
}

export default App;
