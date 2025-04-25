// import Image from "next/image";
"use client";
import Title from "../components/Title.js";
import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const majors = ['Aerospace Engineering', 'Agricultural and Biological Engineering', 'Bioengineering', 'Chemical Engineering', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 'Electrical Engineering', 'Engineering Mechanics', 'Engineering Physics', 'Industrial Engineering', 'Materials Science and Engineering', 'Mechanical Engineering', 'Nuclear, Plasma, and Radiological Engineering', 'Systems Engineering and Design', 'Engineering Undeclared']
  const [classes, setClasses] = useState<string[]>([]);

  //const classes = ['BADM 310', 'BADM 320', 'FIN 221', 'CS 124', 'CS 128', 'CS 173', 'CS 225', 'MATH 241', 'STAT 107', 'STAT 207', 'CS 307', 'ECOn 102', 'ECON 202', 'ECON 203', 'ECON 302', 'CMN 102', 'SPAN 228', 'PHYS 211', 'PHYS 212', 'PHYS 225', 'PHYS 325'];
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  
  const [majorData, setMajorData] = useState<boolean[]>([]);

  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const [classesData, setClassesData] = useState<boolean[]>([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching classes from http://localhost:8000/api/classNames/");
        const response = await fetch('http://localhost:8000/api/classNames/', {
          mode: 'cors', // Explicitly set CORS mode
          headers: {
            'Accept': 'application/json',
          },
        });
        console.log("Response status:", response.status, response.statusText);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch classes: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        console.log("Fetched classes:", data);
        setClasses(data);
        setClassesData(Array(data.length).fill(false));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setIsLoading(false);
      }
    };
  
    fetchClasses();
  }, []);



  const handleSelect = (major: string) => {
    setSelectedMajor(major);  
    console.log("Selected Major:", major); 
  };


  //const [classesData, setClassesData] = useState(Array(classes.length).fill(false));

  const handleDataFromChildClasses = (childData: boolean[]) => {
    setClassesData(childData);
    for (let i = 0; i < childData.length; ++i) {
      if (childData[i]) {
        console.log(classes[i]);
      } 
    }
  };

  const handleDataFromChildMajors = (childData : Array<boolean>) => {
    setMajorData(childData);
    for (let i = 0; i < childData.length; ++i) {
      if (childData[i]) {
        console.log(majors[i]);
      } 
    }
  };


  const goToSecondaryPage = async () => {
    const to_include: string[] = [];
    for (let i = 0; i < classesData.length; ++i) {
      if (classesData[i]) {
        to_include.push(classes[i]);
        console.log('Added:', classes[i]);
      }
    }
    let to_include_majors = Array();
    for (let i = 0; i < majorData.length; ++i) {
      if (majorData[i]) {
        to_include_majors.push(majors[i]);
        console.log('Added:', majors[i]);
      }
    }

    if (to_include_majors.length === 0) {
      alert("Please select a major before proceeding.");
      return;
    }
    if (to_include_majors.length > 1) {
      alert("Please select only one major.");
      return;
    }

    try {
      console.log("Sending POST request to http://localhost:8000/api/minor_progress/");
      const response = await fetch('http://localhost:8000/api/minor_progress/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          classes: to_include,
          major: to_include_majors[0],
        }),
      });

      console.log("Response status:", response.status, response.statusText);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch minor progress: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Minor progress data:", data);

      navigate('/secondary', { state: { minorData: data } });
    }

    catch (error) {
      console.error('Error fetching minor progress:', error);
      alert("Failed to fetch minor progress data. Please try again.");
    }

  };



   // Show loading state while fetching classes
  if (isLoading) {
    return <div>Loading classes...</div>;
  }


  return (<div>
    <Title/> <Subtitle string={"Please select your major:"}/>
    <Dropdown 
      title={"Major"} 
      words={majors} 
      sendDataToParent={handleDataFromChildMajors} 
    /> <Subtitle string={"Select the classes you've taken:"}/>  <Dropdown title={"Classes Taken"} words={classes} sendDataToParent={handleDataFromChildClasses}/> <button
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
  )
  /*
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
  */

}