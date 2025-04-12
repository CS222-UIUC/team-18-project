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
import MinorPercentList from "../components/MinorPercentList.js";


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

  const minors = ['Business', 'Business Analytics', 'Technology & Management', 'Computer Science', 'Math', 'Data Science', 'Economics', 'Statistics', 'Spanish', 'Physics'];
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (<div style={{color : 'black'}}>
    <Title/> <Subtitle string={"Here Is Your Recommended Minor Data:"} />
    <MinorPercentList minors={minors} percentages={percentages}/>
  <button onClick={goToHomePage} style={{color: 'black', marginLeft: '10px', marginTop: '200px'}}> Go To Home Page</button>
   </div>
  )
}