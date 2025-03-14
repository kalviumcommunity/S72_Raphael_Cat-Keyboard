//eslint-disable-next-line
import React from "react"
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {CatKeyboardLanding} from "./routes/route.js"
import {CatKeyboardPage} from "./routes/route.js"
import {Profile} from "./routes/route.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatKeyboardLanding/>} />
        <Route path="/keyboard" element={<CatKeyboardPage/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profile/:id" element={<Profile />} />
</Routes>
    </BrowserRouter>
  )
}
export default App