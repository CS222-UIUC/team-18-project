"use client";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from "../components/Title.js";
import Subtitle from '../components/subtitle2.js';

export default function Jobs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { major, minor } = location.state || { major: "", minor: "" };
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!major || !minor) {
        setError("Major or minor not provided.");
        setIsLoading(false);
        return;
      }

      try {
        console.log(`Fetching jobs for major: ${major}, minor: ${minor}`);
        const response = await fetch('http://localhost:8000/api/job_recommendations/', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ major, minor }),
        });

        console.log("Response status:", response.status, response.statusText);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log("Fetched jobs:", data);
        setJobs(data.jobs || []);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError("Failed to fetch job recommendations. Please try again.");
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, [major, minor]);

  const goToSecondaryPage = () => {
    navigate('/secondary', { state: location.state });
  };

  if (isLoading) {
    return <div>Loading job recommendations...</div>;
  }

  if (error) {
    return (
      <div>
        <Title />
        <Subtitle string={"Error"} />
        <p>{error}</p>
        <button
          onClick={goToSecondaryPage}
          style={{
            color: 'white',
            backgroundColor: '#E84A27',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '10px',
            marginTop: '20px',
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
          Back to Minors
        </button>
      </div>
    );
  }

  return (
    <div style={{ color: 'black' }}>
      <Title />
      <Subtitle string={`Job Recommendations for ${major} Major with ${minor} Minor`} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px auto', width: '80%' }}>
        {jobs.length === 0 ? (
          <p>No job recommendations found.</p>
        ) : (
          jobs.map((job: any, index: number) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                backgroundColor: '#f9f9f9',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: '#333' }}>{job.title}</h3>
              <p style={{ margin: '4px 0', color: '#555' }}><strong>Company:</strong> {job.company}</p>
              <p style={{ margin: '4px 0', color: '#555' }}><strong>Location:</strong> {job.location}</p>
              <p style={{ margin: '4px 0', color: '#555' }}><strong>Description:</strong> {job.description.substring(0, 200)}...</p>
              <a
                href={job.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#E84A27',
                  textDecoration: 'none',
                  fontWeight: '500',
                  marginTop: '8px',
                  display: 'inline-block',
                }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
              >
                View Job
              </a>
            </div>
          ))
        )}
      </div>
      <button
        onClick={goToSecondaryPage}
        style={{
          color: 'white',
          backgroundColor: '#E84A27',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '10px',
          marginTop: '20px',
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
        Back to Minors
      </button>
    </div>
  );
}