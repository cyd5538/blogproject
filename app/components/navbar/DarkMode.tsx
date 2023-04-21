"use client"
import React, { useEffect } from "react";
import useDarkMode from "../hooks/DarkmodeToggle";
import { BsFillSunFill } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";

const DarkMode = () => {
  const DarkToggle = useDarkMode();
  
  const toggleDarkMode = () => {
    const html = document.documentElement; // <html> 요소 선택
    const localStorageKey = 'darkMode'
    if (DarkToggle.isOpen) {
      DarkToggle.isOpen = false
      html.classList.remove("dark"); 
      localStorage.removeItem(localStorageKey); 
    } else {
      DarkToggle.isOpen = true
      html.classList.add("dark"); 
      localStorage.setItem(localStorageKey, 'true')
    }
  };

  useEffect(() => {
    const localStorageKey = 'darkMode';
    const isDarkMode = localStorage.getItem(localStorageKey) === 'true';
    if (isDarkMode) {
      const html = document.documentElement;
      html.classList.add('dark');
    }
  }, []);
  
  return (
    <div className="flex items-center justify-center">
      <button 
      onClick={toggleDarkMode}
      >
      {DarkToggle.isOpen ? 
        <p 
        className="p-2 bg-purple-900 text-yellow-400 rounded-full">
          <BsFillSunFill size={20} onClick={DarkToggle.onClose}/>
        </p>
      :
        <p 
        className="p-2 bg-black text-yellow-400 rounded-full">
          <MdDarkMode size={20} onClick={DarkToggle.onOpen}/>
        </p> 
      }
      </button>
    </div>
  )
}

export default DarkMode
