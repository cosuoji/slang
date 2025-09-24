import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Submit from "./pages/Submit";
import Glossary from "./pages/Glossary";
import SlangPage from "./pages/SlangPage";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Feedback from "./pages/Feedback";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Flex column layout to keep footer at bottom */}
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {/* flex-grow ensures this section stretches to fill space */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/submit" element={<Submit />} />
                <Route path="/signup" element={<Signup />} /> 
                <Route path="/admin" element={<Admin />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/slang/:slug" element={<SlangPage />} />
              <Route path="/slang/:id" element={<SlangPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
