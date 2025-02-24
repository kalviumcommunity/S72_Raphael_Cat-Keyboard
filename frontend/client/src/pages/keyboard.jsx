//eslint-disable-next-line
import React from "react";
import InteractiveKeyboard from "../components/keyboard.jsx";

const CatKeyboardPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6">Cat Keyboard 🎹🐱</h1>
      <InteractiveKeyboard />
    </div>
  );
};

export default CatKeyboardPage;