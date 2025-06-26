//eslint-disable-next-line
import React, { useState, useEffect, useRef } from "react";
import A from "../sounds/A.wav";
import B from "../sounds/B.wav";
import C from "../sounds/C.wav";
import D from "../sounds/D.wav";
import E from "../sounds/E.wav";
import F from "../sounds/F.wav";
import G from "../sounds/G.wav";
import H from "../sounds/H.wav";
import I from "../sounds/I.wav";
import J from "../sounds/J.wav";
import K from "../sounds/K.wav";
import L from "../sounds/L.wav";
import M from "../sounds/M.wav";
import N from "../sounds/N.wav";
import O from "../sounds/O.wav";
import P from "../sounds/P.wav";
import Q from "../sounds/Q.wav";
import R from "../sounds/R.wav";
import S from "../sounds/S.wav";
import T from "../sounds/T.wav";
import U from "../sounds/U.wav";
import V from "../sounds/V.wav";
import W from "../sounds/W.wav";
import X from "../sounds/X.wav";
import Y from "../sounds/Y.wav";
import Z from "../sounds/Z.wav";
import Space from "../sounds/SPACE.wav";

const keysLayout = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
  ["Space"]
];

const soundFiles = {
  A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,Space
};

const InteractiveKeyboard = () => {
  const [pressedKeys, setPressedKeys] = useState(new Set());
  const audioMap = useRef(new Map());

  // Load audio files once on mount
  useEffect(() => {
    Object.entries(soundFiles).forEach(([key, src]) => {
      const audio = new Audio(src);
      audioMap.current.set(key, audio);
    });
  }, []);
  const lastPlayedRef = useRef({});
  const COOLDOWN_MS = 200;
  const playSound = (key) => {
    const now = Date.now();
    const lastPlayed = lastPlayedRef.current[key] || 0;

    if (now - lastPlayed < COOLDOWN_MS) return; // Cooldown active, skip
      lastPlayedRef.current[key] = now;

      const audio = audioMap.current.get(key);
      
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch((e) => console.warn(`Audio error for ${key}:`, e));
    }
  };

  const handleKeyDown = (event) => {
    const rawKey = event.key === " " ? "Space" : event.key.toUpperCase();
    setPressedKeys((prev) => new Set(prev).add(rawKey));
    playSound(rawKey);
  };

  const handleKeyUp = (event) => {
    const rawKey = event.key === " " ? "Space" : event.key.toUpperCase();
    setPressedKeys((prev) => {
      const newSet = new Set(prev);
      newSet.delete(rawKey);
      return newSet;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = (key) => {
    setPressedKeys((prev) => new Set(prev).add(key));
    playSound(key);
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
              } ${key === "Space" ? "w-64 h-16" : "w-20 h-20"}`}
              onMouseDown={() => handleMouseDown(key)}
              onMouseUp={() => handleMouseUp(key)}
              onMouseLeave={() => handleMouseUp(key)}
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
