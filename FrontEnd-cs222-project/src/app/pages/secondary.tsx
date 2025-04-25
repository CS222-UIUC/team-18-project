// import Image from "next/image";
"use client";
import Title from "../components/Title.js";
//import Dropdown from "../components/Dropdown.js";
import Subtitle from '../components/subtitle2.js';
//import MajorDropdown from "../components/majorDropdown.js";
//import LinkButton from "../components/LinkButton.js";
import React, { useEffect} from 'react'; 
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import MinorPercentList from "../components/MinorPercentList.js";


export default function Secondary({refresh = 0}) {

  const navigate = useNavigate();
  const location = useLocation();

  const goToHomePage = () => {
    navigate('/');
  }

  useEffect(() => {
    if (refresh > 0) {
      goToHomePage();
    }
  }, [refresh, goToHomePage]);

  // const minors = ['Business', 'Business Analytics', 'Technology & Management', 'Computer Science', 'Math', 'Data Science', 'Economics', 'Statistics', 'Spanish', 'Physics'];
  // const percentages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90];
  const minorData = location.state?.minorData || { percentages: {}, top_minors: [] };
  const percentages = Object.values(minorData.percentages);
  const minors = Object.keys(minorData.percentages);
  return (
    <div style={{ color: 'black' }}>
      <Title />
      <Subtitle string={"Here Is Your Recommended Minor Data:"} />
  
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {minors.map((minor, index) => {
          const percentage = percentages[index];
          let bgColor = '#FF6F61';  // Lighter grey for below 40%
          
          if (Number(percentage) >= 70) {
            bgColor = '#4CAF50'; // Softer green
          } else if (Number(percentage) >= 40) {
            bgColor = '#FFEB3B'; // Softer yellow
          }
  
          return (
            <div
              key={index}
              style={{
                position: 'relative',
                width: '80%',  // Limit bar width to 80% of container
                height: '40px',
                border: '1px solid #ccc',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundColor: '#f0f0f0',
                margin: '0 auto', // Center the bars
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  backgroundColor: bgColor,
                  transition: 'width 0.5s ease',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: '12px',
                  fontWeight: '500',
                  color: 'black',
                }}
              >
                {minor}: {Number(percentage).toFixed(2)}%  {/* Truncated to 2 decimals */}
              </div>
            </div>
          );
        })}
      </div>
  
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
        onMouseEnter={e =>
          ((e.target as HTMLElement).style.backgroundColor = '#13294B')
        }
        onMouseLeave={e =>
          ((e.target as HTMLElement).style.backgroundColor = '#E84A27')
        }
      >
        Back
      </button>
    </div>
  );
}