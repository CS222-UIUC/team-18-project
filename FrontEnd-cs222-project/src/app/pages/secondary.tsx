// import Image from "next/image";
"use client";
import Title from "../components/Title.js";
import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
import MajorDropdown from "../components/majorDropdown.js";
import LinkButton from "../components/LinkButton.js";
import React, { useEffect, useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Secondary({refresh = 0}) {

    const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/');
  }

  useEffect(() => {
    if (refresh > 0) {
      goToHomePage();
    }
  }, []);

  return (<div style={{color : 'black'}}>
    <Title/> <Subtitle string={"Here Is Your Recommended Minor Data:"} />
    <div>
    Second Page
    </div>
  <button onClick={goToHomePage} style={{color: 'black', marginLeft: '10px', marginTop: '430px'}}> Go To Home Page</button>
   </div>
  )
}