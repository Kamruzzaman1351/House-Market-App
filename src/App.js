import { Routes, Route } from "react-router-dom"

import { HomePage, ProfilePage, OffersPage, SignupPage, LoginPage, ForgotPassword } from "./pages"
import { Navbar } from "./components";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
      <Navbar />      
    </>
  );
}

export default App;
