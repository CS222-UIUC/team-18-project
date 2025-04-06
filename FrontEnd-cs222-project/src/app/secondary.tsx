// import Image from "next/image";
"use client";
import Title from "./components/Title.js";
import Dropdown from "./components/Dropdown.js";
import Subtitle from './components/subtitle2.js';
import MajorDropdown from "./components/majorDropdown.js";
import LinkButton from "./components/LinkButton.js";
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Secondary() {

    const navigate = useNavigate();

  const goToHomePage = () => {
    navigate(-1);
  }

  return (<div style={{color : 'black'}}>
    <Title/> 
  Second Page
  <button onClick={goToHomePage} style={{color: 'black'}}> Go To Home Page</button>
   </div>
  )
}