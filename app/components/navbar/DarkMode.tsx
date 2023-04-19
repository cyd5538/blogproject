"use client"
import React, { useEffect, useState } from "react";
import useDarkMode from "../hooks/DarkmodeToggle";
import { BsSun } from "react-icons/bs";
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

  return (
    <div>
      <button onClick={toggleDarkMode}>
      {DarkToggle.isOpen ? 
      <MdDarkMode size={30} onClick={DarkToggle.onClose}/>
      :
      <BsSun size={30} onClick={DarkToggle.onOpen}/> 
      }
      </button>
    </div>
  )
}

export default DarkMode
