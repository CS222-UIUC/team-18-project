"use client";
import Title from "../components/Title.js";
import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import MajorDropdown from '../components/majorDropdown.js';

export default function Home() {
  const majors = ['Aerospace Engineering', 'Agricultural and Biological Engineering', 'Bioengineering', 'Chemical Engineering', 'Civil Engineering', 'Computer Engineering', 'Computer Science', 'Electrical Engineering', 'Engineering Mechanics', 'Engineering Physics', 'Industrial Engineering', 'Materials Science and Engineering', 'Mechanical Engineering', 'Nuclear, Plasma, and Radiological Engineering', 'Systems Engineering and Design', 'Engineering Undeclared'];
  const [classes, setClasses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [majorData, setMajorData] = useState<boolean[]>([]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [classesData, setClassesData] = useState<boolean[]>([]);
  const [currentClasses, setCurrentClasses] = useState<string[]>([]);
  const [selectedCurrentClasses, setSelectedCurrentClasses] = useState<boolean[]>([]);
  const [offset, setOffset] = useState<number | null>(null);
  const [endOffset, setEndOffset] = useState<number | null>(null);

  let closeClasses = function() {};

  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching classes from http://localhost:8000/api/classNames/");
        const response = await fetch('http://localhost:8000/api/classNames/', {
          mode: 'cors',
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
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
    fetchClasses();
    fetchSubjects();
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

    closeClasses();

    console.log("Offset:", offset);
    console.log("EndOffset:", endOffset);
    console.log("ChangedClasses", currentClasses);
    console.log("SelectedClasses", selectedCurrentClasses);
  };

  const handleDataFromChildClasses = (childData: boolean[]) => {
    if (offset != null && offset != -1 && endOffset != null) {
      var newClassesData = classesData;
      var j : number = 0;
      for (let i = offset; i < classes.length && i < endOffset; ++i) {
        newClassesData[i] = childData[j];
        ++j;
      }
      setClassesData(newClassesData);
    }
  };

  const getClose = (childFunction : () => {}) => {
    closeClasses = childFunction;
  };

  const handleDataFromChildMajors = (childData : Array<boolean>) => {
    setMajorData(childData);
    const selectedIndex = childData.indexOf(true); // Define selectedIndex here
    setSelectedMajor(selectedIndex >= 0 ? majors[selectedIndex] : "");
    console.log("Selected major:", selectedIndex >= 0 ? majors[selectedIndex] : "None"); // Debug log
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
    let to_include_majors = [];
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

      navigate('/secondary', { state: { minorData: data, selectedMajor: to_include_majors[0] } });
    } catch (error) {
      console.error('Error fetching minor progress:', error);
      alert("Failed to fetch minor progress data. Please try again.");
    }
  };

  if (isLoading) {
    return <div>Loading classes...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13294B]/5 via-white to-[#E84A27]/5 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl relative overflow-visible p-8">
        <div className="bg-gradient-to-r from-[#13294B] to-[#E84A27] h-2 w-full"></div>
        
        <div className="p-10 space-y-10">
          {/* Header */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-block bg-[#13294B]/10 px-6 py-3 rounded-full">
              <h1 className="text-3xl font-bold text-[#13294B]">
                Illini Minor Planner
              </h1>
            </div>
            <p className="text-lg text-[#E84A27] font-medium">
              Configure Your Academic Pathway
            </p>
          </div>

          {/* Major Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#13294B] flex items-center gap-3">
              <span className="bg-[#13294B] text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                1
              </span>
              <span>Major</span>
            </h2>
            <Dropdown 
              title="Select Your Major" 
              words={majors}
              sendDataToParent={handleDataFromChildMajors}
              className="border-2 border-[#E84A27]/30 hover:border-[#13294B] transition-colors p-4 rounded-xl"
              initial={Array(majors.length).fill(false)}
            />
          </div>

          {/* Course Selection */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#13294B] flex items-center gap-3">
              <span className="bg-[#13294B] text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                2
              </span>
              <span>Subjects</span>
            </h2>
            <MajorDropdown
              title="Select Your Subjects"
              options={subjects}
              handleSelect={handleSelect}
              className="border-2 border-[#E84A27]/30 hover:border-[#13294B] transition-colors p-4 rounded-xl"
            />
          </div>

          {/* Completed Classes */}
          <div className="space-y-4" style={{ position: "relative", display: "inline-block", width: "100%" }}>
            <h2 className="text-xl font-semibold text-[#13294B] flex items-center gap-3">
              <span className="bg-[#13294B] text-white p-2 rounded-full w-8 h-8 flex items-center justify-center">
                3
              </span>
              <span>Completed Courses</span>
            </h2>
            <Dropdown
              title="Select Completed Courses"
              words={currentClasses}
              initial={selectedCurrentClasses}
              sendDataToParent={handleDataFromChildClasses}
              className="border-2 border-[#E84A27]/30 hover:border-[#13294B] transition-colors p-4 rounded-xl"
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={goToSecondaryPage}
            className="mt-12 w-full max-w-xs mx-auto py-4 px-6 bg-gradient-to-r from-[#E84A27] to-[#13294B] text-white font-semibold rounded-xl hover:shadow-xl hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Continue Academic Planning</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}