"use client";
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from "../components/Title.js";
import Subtitle from '../components/subtitle2.js';

// Define the shape of a Job
interface Job {
  title: string;
  location: string;
  company: string;
  description: string;
  url: string;
}

// Define the shape of the API response
interface JobResponse {
  jobs: Job[];
  next_keyword_index: number | null;
  next_page: number;
  has_more: boolean;
  total_keywords: number;
}

export default function Jobs() {
  const navigate = useNavigate();
  const location = useLocation();
  const { major, minor } = location.state || { major: "", minor: "" };
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nextKeywordIndex, setNextKeywordIndex] = useState<number>(0);
  const [nextPage, setNextPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);

  console.log("Jobs.tsx received state:", { major, minor });

  const lastJobElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchJobs();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  const fetchJobs = async () => {
    if (!hasMore || isLoading) return;
    if (!major || !minor) {
      setError("Major or minor not provided.");
      return;
    }

    setIsLoading(true);
    try {
      console.log(`Fetching jobs for major: ${major}, minor: ${minor}, keywordIndex: ${nextKeywordIndex}, page: ${nextPage}`);
      const response = await fetch('http://localhost:8000/api/job_recommendations/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          major,
          minor,
          current_keyword_index: nextKeywordIndex,
          current_page: nextPage,
        }),
      });

      console.log("Response status:", response.status, response.statusText);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data: JobResponse = await response.json();
      console.log("Fetched jobs:", data);

      const newJobs: Job[] = Array.isArray(data.jobs) ? data.jobs : [];
      setJobs((prevJobs: Job[]) => [...prevJobs, ...newJobs]);
      setNextKeywordIndex(data.next_keyword_index ?? 0);
      setNextPage(data.next_page ?? 1);
      setHasMore(data.has_more);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError("Failed to fetch job recommendations. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const goToSecondaryPage = () => {
    navigate('/secondary', { state: location.state });
  };

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
          onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#13294B')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#E84A27')}
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
        {jobs.length === 0 && !isLoading ? (
          <p>No job recommendations found. Try a different major or minor combination.</p>
        ) : (
          jobs.map((job: Job, index: number) => {
            const isLastElement = index === jobs.length - 1;
            return (
              <div
                key={`${job.url}-${index}`}
                ref={isLastElement ? lastJobElementRef : null}
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
                  onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
                  onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
                >
                  View Job
                </a>
              </div>
            );
          })
        )}
        {isLoading && <p>Loading more jobs...</p>}
        {!hasMore && jobs.length > 0 && <p>No more jobs to load.</p>}
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
        onMouseEnter={(e) => ((e.target as HTMLElement).style.backgroundColor = '#13294B')}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.backgroundColor = '#E84A27')}
      >
        Back to Minors
      </button>
    </div>
  );
}