// import Image from "next/image";
"use client";
import Title from "../components/Title.js";
//import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
//import MajorDropdown from "../components/majorDropdown.js";
//import LinkButton from "../components/LinkButton.js";
import React, { useEffect} from 'react'; 
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  }, [refresh, goToHomePage]);

  const minors = ['Business', 'Business Analytics', 'Technology & Management', 'Computer Science', 'Math', 'Data Science', 'Economics', 'Statistics', 'Spanish', 'Physics'];
  const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];

  return (<div style={{color : 'black'}}>
    <Title/> <Subtitle string={"Here Is Your Recommended Minor Data:"} />
    <MinorPercentList minors={minors} percentages={percentages}/>
    <button
  onClick={goToHomePage}
  style={{
    color: 'white',
    backgroundColor: '#E84A27',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '10px',
    marginTop: '200px',
    marginLeft: '10px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  }}
  onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = '#13294B')}
  onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = '#E84A27')}
>
  Back
</button>
   </div>
  )
}