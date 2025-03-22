//eslint-disable-next-line
import React from "react"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CatKeyboardLanding } from "./routes/route.js"
import { CatKeyboardPage } from "./routes/route.js"
import { Profile } from "./routes/route.js";
import Login from "./pages/login.jsx";
import Signup from "./pages/signup.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatKeyboardLanding/>} />
        <Route path="/keyboard" element={<CatKeyboardPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App