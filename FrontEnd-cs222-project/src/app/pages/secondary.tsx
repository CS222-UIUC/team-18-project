"use client";
import Title from "../components/Title.js";
import Subtitle from '../components/subtitle2.js';
import React, { useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import MinorPercentList from "../components/MinorPercentList.js";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';


export default function Secondary({ refresh = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract both minorData and selectedMajor from location.state
  const { minorData = { percentages: {}, top_minors: [] }, selectedMajor = "", storedSubject = "", storedClassesData = [], storedCurrentClasses = [], storedSelectedClasses = [], storedOffset = null, storedEndOffset = null  } = location.state || {};
  const percentages = Object.values(minorData.percentages);
  const minors = Object.keys(minorData.percentages);

  const goToHomePage = () => {
    navigate('/', { 
      state: { 
        storedMajor : selectedMajor, 
        storedSubject, 
        storedClassesData, 
        storedCurrentClasses, 
        storedSelectedClasses, 
        storedOffset, 
        storedEndOffset 
      } 
    });
  };

  useEffect(() => {
    if (refresh > 0) {
      goToHomePage();
    }
  }, [refresh]);

  const handleMinorClick = (minor: string) => {
    console.log(`Clicked on minor: ${minor}, selectedMajor: ${selectedMajor}`);
    if (!selectedMajor) {
      console.error("No major selected. Navigation aborted.");
      return;
    }
    navigate('/jobs', { state: { major: selectedMajor, minor, minorDataStored: minorData, storedSubject } });
  };


const downloadPDF = async () => {
  const element = document.getElementById("results-to-download");
  if (!element) return;

  // Wait for any transition/animation if using Tailwind etc.
  await new Promise(r => setTimeout(r, 100));
  
  const canvas = await html2canvas(element as HTMLElement, { scale: 2 } as any);
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const margin = 10; // mm
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const usableWidth = pageWidth - margin * 2;
  const usableHeight = pageHeight - margin * 2;

  // Compute scaled image height to fit within usable area
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(usableWidth / imgWidth, usableHeight / imgHeight);
  const renderWidth = imgWidth * ratio;
  const renderHeight = imgHeight * ratio;

  pdf.addImage(
    imgData,
    "PNG",
    margin + (usableWidth - renderWidth) / 2, // center horizontally within margin
    margin + (usableHeight - renderHeight) / 2, // center vertically within margin
    renderWidth,
    renderHeight
  );

  pdf.save("minor_recommendations.pdf");
};


  




  return (
    <div className="min-h-screen bg-gradient-to-br from-[#13294B]/5 via-white to-[#E84A27]/5 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#13294B] to-[#E84A27] h-2 w-full"></div>
        
        <div className="p-10 space-y-10">

          {/* Content to be converted to PDF */}
          <div id="results-to-download" className="space-y-10" style={{ color: "black" }}>
            {/* Header */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold text-[#13294B]">
                Recommended Minor Data
              </h1>
              <p className="text-lg text-[#E84A27] font-medium">
                Based on your completed courses
              </p>
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {minors.map((minor, index) => {
                const percentage = percentages[index];
                let bgColor = '#FF6F61'; // Coral for <40%
                
                if (Number(percentage) >= 70) {
                  bgColor = '#4CAF50'; // Green
                } else if (Number(percentage) >= 40) {
                  bgColor = '#FFC107'; // Amber
                }

                return (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between px-1">
                      <span 
                        className="font-medium text-[#13294B] cursor-pointer hover:underline"
                        onClick={() => handleMinorClick(minor)}
                      >
                        {minor}
                      </span>
                      <span className="font-semibold text-[#374151]">{Number(percentage).toFixed(2)}%</span>
                    </div>
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: bgColor
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Download as PDF Button */}
          <button
            onClick={downloadPDF}
            className="w-full max-w-xs mx-auto py-3 px-6 bg-[#13294B] text-white font-semibold rounded-xl hover:shadow-xl hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Download as PDF</span>
          </button>

          {/* Back Button */}
          <button
            onClick={goToHomePage}
            className="w-full max-w-xs mx-auto py-3 px-6 bg-gradient-to-r from-[#E84A27] to-[#13294B] text-white font-semibold rounded-xl hover:shadow-xl hover:brightness-110 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Back to Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );  
}