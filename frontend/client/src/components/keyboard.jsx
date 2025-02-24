//eslint-disable-next-line
import React, { useState, useEffect } from "react";

const keysLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Space"]
];

const InteractiveKeyboard = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key === " " ? "Space" : event.key.toUpperCase();
      setPressedKeys((prev) => new Set(prev).add(key));
    };

    const handleKeyUp = (event) => {
      const key = event.key === " " ? "Space" : event.key.toUpperCase();
      setPressedKeys((prev) => {
        const newSet = new Set(prev);
        newSet.delete(key);
        return newSet;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const handleMouseDown = (key) => {
    setPressedKeys((prev) => new Set(prev).add(key));
  };

  const handleMouseUp = (key) => {
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(key);
      return newSet;
    });
  };

  return (
    <div className="flex flex-col items-center space-y-2 p-4 bg-gray-900 text-white rounded-lg shadow-lg">
      {keysLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-2">
          {row.map((key) => (
            <div
              key={key}
              className={`flex items-center justify-center text-lg font-bold border-2 border-gray-600 rounded-lg transition-all select-none cursor-pointer ${
                pressedKeys.has(key) ? "bg-blue-500 border-blue-700 scale-110" : "bg-gray-800"
              } ${key === "Space" ? "w-48 h-12" : "w-12 h-12"}`}
              onMouseDown={() => handleMouseDown(key)}
              onMouseUp={() => handleMouseUp(key)}
              onMouseLeave={() => handleMouseUp(key)} // Ensures key releases when moving mouse away
            >
              {key === "Space" ? "␣" : key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default InteractiveKeyboard;
