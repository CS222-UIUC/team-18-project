// import Image from "next/image";
"use client";
import Title from "../components/Title.js";
import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import MajorDropdown from '../components/majorDropdown.js';
export default function Home() {

  const majors = ['Aerospace Engineering', 'Agricultural and Biological Engineering', 'Bioengineering', 'Chemical Engineering', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 'Electrical Engineering', 'Engineering Mechanics', 'Engineering Physics', 'Industrial Engineering', 'Materials Science and Engineering', 'Mechanical Engineering', 'Nuclear, Plasma, and Radiological Engineering', 'Systems Engineering and Design', 'Engineering Undeclared']
  const [classes, setClasses] = useState<string[]>([]);

  const [subjects, setSubjects] = useState<string[]>([]);
  // const [subjectData, setSubjectData] = useState<boolean[]>([]);
  
  //const classes = ['BADM 310', 'BADM 320', 'FIN 221', 'CS 124', 'CS 128', 'CS 173', 'CS 225', 'MATH 241', 'STAT 107', 'STAT 207', 'CS 307', 'ECOn 102', 'ECON 202', 'ECON 203', 'ECON 302', 'CMN 102', 'SPAN 228', 'PHYS 211', 'PHYS 212', 'PHYS 225', 'PHYS 325'];
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  
  const [majorData, setMajorData] = useState<boolean[]>([]);

  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [classesData, setClassesData] = useState<boolean[]>([]);

  const [currentClasses, setCurrentClasses] = useState<string[]>([]);
  const [selectedCurrentClasses, setSelectedCurrentClasses] = useState<boolean[]>([]);
  const [offset, setOffset] = useState<number | null>(null);
  const [endOffset, setEndOffset] = useState<number | null>(null);

  let closeClasses = function() {};
  let first = true;


  
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
    const fetchSubjects = async () => {
      try {
        console.log("Fetching subjects from http://localhost:8000/api/subjectNames/");
        const response = await fetch('http://localhost:8000/api/subjectNames/', {
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
          },
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch subjects: ${response.status} ${response.statusText} - ${errorText}`);
        }
  
        const data = await response.json();
        console.log("Fetched subjects:", data);
        setSubjects(data);
        // setSubjectData(Array(data.length).fill(false));
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchClasses();
    fetchSubjects();
    setMajorData(Array(majors.length).fill(false));
  }, []);
  



  const handleSelect = (subject: string) => {
    setSelectedSubject(subject);  
    console.log("Selected subject:", subject); 
    console.log("Subject length:", subject.length);
    var changedClasses : string[] = [];
    var changedSelectedClasses : boolean[] = [];
    var changedOffset : number = -1;
    var changedEndOffset : number = -1;
    if (subject != null) {
      for (let i = 0; i < classes.length; ++i) {
        if (classes[i].substring(0, subject.length) == subject && classes[i].substring(subject.length, subject.length+1) == " ") {
          changedOffset = i;
          console.log("ChangedOffset:", changedOffset);
          while (i < classes.length && classes[i].substring(0, subject.length) == subject && classes[i].substring(subject.length, subject.length+1) == " ") {
            changedClasses.push(classes[i]);
            changedSelectedClasses.push(classesData[i]);
            ++i;
          }
          changedEndOffset = i;
          console.log("ChangedEndOffset:", changedEndOffset);
          break;
        }
      }
    }

    setCurrentClasses(changedClasses);
    setSelectedCurrentClasses(changedSelectedClasses);
    setOffset(changedOffset);
    setEndOffset(changedEndOffset);

    

    console.log("Offset:", offset);
    console.log("EndOffset:", endOffset);
    console.log("ChangedClasses", currentClasses);
    console.log("SelectedClasses", selectedCurrentClasses);
  };


  //const [classesData, setClassesData] = useState(Array(classes.length).fill(false));

  const handleDataFromChildClasses = (childData: boolean[]) => {
    //setClassesData(childData);
    if (offset != null && offset != -1 && endOffset != null) {
      var newClassesData = classesData;
      var j : number = 0;
      for (let i = offset; i < classes.length && i < endOffset; ++i) {
        newClassesData[i] = childData[j];
        ++j;
      }
      setClassesData(newClassesData);
      setSelectedCurrentClasses(childData);
    }
    //for (let i = 0; i < childData.length; ++i) {
    //  if (childData[i]) {
    //    console.log(classes[i]);
    //  } 
    //}
  };

  // const handleDataFromChildSubjects = (childData: boolean[]) => {
  //   setSubjectData(childData);
  //   for (let i = 0; i < childData.length; ++i) {
  //     if (childData[i]) {
  //       console.log(subjects[i]);
  //     }
  //   }
  // };
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
      initial={majorData}
      sendDataToParent={handleDataFromChildMajors}
    /> <Subtitle string={"Select your subjects:"} />
    <MajorDropdown 
      title={"Subjects"} 
      options = {subjects}
      handleSelect={handleSelect}
    /><Subtitle string={"Select the classes you've taken:"}/>  <Dropdown title={"Classes Taken"} words={currentClasses} initial={selectedCurrentClasses}  sendDataToParent={handleDataFromChildClasses}/> <button
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