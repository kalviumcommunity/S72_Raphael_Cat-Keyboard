//eslint-disable-next-line
import React from "react"
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import {CatKeyboardLanding} from "./routes/route.js"
import {CatKeyboardPage} from "./routes/route.js"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CatKeyboardLanding/>} />
        <Route path="/keyboard" element={<CatKeyboardPage/>} />
</Routes>
    </BrowserRouter>
  )
}
export default App