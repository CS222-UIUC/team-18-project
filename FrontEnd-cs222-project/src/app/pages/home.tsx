"use client";
import Title from "../components/Title.js";
import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
import MajorDropdown from "../components/majorDropdown.js";
import LinkButton from "../components/LinkButton.js";
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const majors = [
    'Aerospace Engineering', 'Agricultural and Biological Engineering', 'Bioengineering', 
    'Chemical Engineering', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 
    'Electrical Engineering', 'Engineering Mechanics', 'Engineering Physics', 'Industrial Engineering', 
    'Materials Science and Engineering', 'Mechanical Engineering', 
    'Nuclear, Plasma, and Radiological Engineering', 'Systems Engineering and Design', 
    'Engineering Undeclared'
  ];

  const [classes, setClasses] = useState<string[]>([]);
  const [classesData, setClassesData] = useState<boolean[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSelect = (major: string) => {
    setSelectedMajor(major);  
    console.log("Selected Major:", major); 
  };

  useEffect(() => {
    fetch('http://localhost:8000/classNames/', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        setClasses(data);
      })
      .catch(error => console.error("Failed to fetch classes:", error));
  }, []);

  useEffect(() => {
    setClassesData(Array(classes.length).fill(false));
  }, [classes]);

  const handleDataFromChild = (childData: boolean[]) => {
    setClassesData(childData);
    for (let i = 0; i < childData.length; ++i) {
      if (childData[i]) {
        console.log(classes[i]);
      } 
    }
  };

  const goToSecondaryPage = () => {
    const to_include: string[] = [];
    for (let i = 0; i < classesData.length; ++i) {
      if (classesData[i]) {
        to_include.push(classes[i]);
        console.log('Added:', classes[i]);
      }
    }
    navigate('/secondary');
  };

  return (
    <div>
      <Title />
      <Subtitle string={"Please select your major:"} />
      <Dropdown 
        title={"Major"} 
        words={majors} 
        sendDataToParent={handleSelect} 
      />
      <Subtitle string={"Select the classes you've taken:"} />
      <Dropdown 
        title={"Classes Taken"} 
        words={classes} 
        sendDataToParent={handleDataFromChild} 
      />
      <button
        onClick={goToSecondaryPage}
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
        Next Page
      </button>
    </div>
  );
}