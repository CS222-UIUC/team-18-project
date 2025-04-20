import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from "../components/Title.js";
import Subtitle from '../components/subtitle2.js';

export default function Secondary({ refresh = 0 }) {
  const navigate = useNavigate();
  const [minorProgressData, setMinorProgressData] = useState<any>(null);
  
  // List of hardcoded classes (for now)
  const hardcodedClasses = [
    "CS 124", "CS 128", "CS 173", "CS 225", "MATH 241", "STAT 107", "STAT 207", "CS 307",
    "ECON 102", "ECON 202", "ECON 203", "ECON 302", "SPAN 228", "PHYS 211", "PHYS 212"
  ];

  const goToHomePage = () => {0
    navigate('/');
  };

  useEffect(() => {
    const fetchMinorProgress = async () => {
      // Always fetch for "Computer Science" regardless of selection
      const encodedMajor = encodeURIComponent('Computer Science');
      console.log(`Fetching minor progress for Computer Science...`);

      try {
        // Send the hardcoded classes to the backend
        const response = await fetch(`http://localhost:8000/api/minor_progress/${encodedMajor}/`, {
          method: "POST", // Assuming POST for data submission
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            major: "Computer Science",  // Major can be hardcoded or dynamic
            classes: hardcodedClasses,  // The list of classes to send to the backend
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch minor progress: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Minor progress data:", data);
        setMinorProgressData(data);
      } catch (error) {
        console.error("Error fetching minor progress:", error);
      }
    };

    fetchMinorProgress();
  }, []); // Only run this effect on component mount

  return (
    <div className="text-black"> {/* Apply the black text class globally */}
      {/* Title Component */}
      <Title />
      <Subtitle string="Viewing progress for Computer Science major" />

      {/* We removed the Major Selection Dropdown as it will always fetch for Computer Science */}
      <div style={{ marginBottom: "20px" }}>
        <p>Displaying minor progress for Computer Science:</p>
      </div>

      {/* Minor Progress Data */}
      {minorProgressData ? (
        <div className="bg-light p-4 rounded-lg" style={{ backgroundColor: "#f5f5f5" }}>
          <h2 className="text-dark mb-4" style={{ color: "#13294B" }}>Minor Completion by Major</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.entries(minorProgressData.percentages).map(([major, percent]) => (
              <li key={major} className="mb-3" style={{ marginBottom: "12px" }}>
                <strong>{major}:</strong> {Number(percent).toFixed(2)}% complete
                <div style={{ 
                  width: "100%", 
                  backgroundColor: "#ddd", 
                  borderRadius: "5px", 
                  marginTop: "4px" 
                }}>
                  <div style={{ 
                    width: `${percent}%`, 
                    backgroundColor: Number(percent) >= 70 ? "#28a745" : "#ffc107", 
                    height: "10px", 
                    borderRadius: "5px" 
                  }} />
                </div>
              </li>
            ))}
          </ul>

          <h3 className="text-dark mt-4">Top 3 Minors:</h3>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {minorProgressData.top_minors.map(([minor, percent], index) => (
              <li key={index}>
                <strong>{minor}:</strong> {Number(percent).toFixed(2)}% complete
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-black">Loading progress data...</p>
      )}
    </div>
  );
}


//   return (<div style={{color : 'black'}}>
//     <Title/> <Subtitle string={"Here Is Your Recommended Minor Data:"} />
//     <MinorPercentList minors={minors} percentages={percentages}/>
//     <button
//   onClick={goToHomePage}
//   style={{
//     color: 'white',
//     backgroundColor: '#E84A27',
//     padding: '12px 24px',
//     border: 'none',
//     borderRadius: '10px',
//     marginTop: '200px',
//     marginLeft: '10px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     fontWeight: '500',
//     boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//     transition: 'background-color 0.3s ease',
//   }}
//   onMouseEnter={e => ((e.target as HTMLElement).style.backgroundColor = '#13294B')}
//   onMouseLeave={e => ((e.target as HTMLElement).style.backgroundColor = '#E84A27')}
// >
//   Back
// </button>

//    </div>
//   )
// }