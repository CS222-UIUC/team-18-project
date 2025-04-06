// import Image from "next/image";
"use client";
import Title from "./components/Title.js";
import Dropdown from "./components/Dropdown.js";
import Subtitle from './components/subtitle2.js';
import MajorDropdown from "./components/majorDropdown.js";
import LinkButton from "./components/LinkButton.js";
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const majors = ['Business', 'Chemistry', 'Communications', 'Computer Science', 'Data Science', 'Economics', 'Math', 'Physics', 'Spanish', 'Statistics', 'Other'];
  const classes = ['BADM 310', 'BADM 320', 'FIN 221', 'CS 124', 'CS 128', 'CS 173', 'CS 225', 'MATH 241', 'STAT 107', 'STAT 207', 'CS 307', 'ECOn 102', 'ECON 202', 'ECON 203', 'ECON 302', 'CMN 102', 'SPAN 228', 'PHYS 211', 'PHYS 212', 'PHYS 225', 'PHYS 325'];
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const handleSelect = (major: string) => {
    setSelectedMajor(major);  
    console.log("Selected Major:", major); 
  };

  const navigate = useNavigate();

  const goToSecondaryPage = () => {
    navigate('/secondary');
  }
  return (<div>
    <Title/> 
  <MajorDropdown title={"Major"} options={majors} handleSelect={handleSelect}/> <Subtitle/>  <Dropdown title={"Classes Taken"} words={classes}/> <button onClick={goToSecondaryPage}  style={{color: 'black'}}> Go To Secondary Page</button>
   </div>
  )
}