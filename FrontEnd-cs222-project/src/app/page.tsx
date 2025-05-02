
// import Image from "next/image";
"use client";
//import Title from "./components/Title.js";
//import Dropdown from "./components/Dropdown.js";
//import Subtitle from './components/subtitle2.js';
//import MajorDropdown from "./components/majorDropdown.js";
//import LinkButton from "./components/LinkButton.js";
import React, { useEffect, useState } from 'react'; 
import { BrowserRouter, Routes, Route} from 'react-router-dom';
//import Home from './pages/home.tsx';
import Secondary from './pages/secondary.tsx';
//import { useNavigate } from 'react-router-dom';
import Home from './pages/home.tsx';

import Jobs from './pages/Jobs.tsx';

const Page = () => {
  //return (<Home />);

  //const navigate = useNavigate;

  //navigate('/home');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
 
  return (
    <div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/secondary" element={<Secondary refresh={0}/>} />
        <Route path="/jobs" element={<Jobs />} />
      </Routes>
    </BrowserRouter>
    </div>
      
  
  );
  
  
};

export default Page;






/*

// import Image from "next/image";
"use client";
import Title from "./components/Title.js";
import Dropdown from "./components/Dropdown.js";
import Subtitle from './components/subtitle2.js';
import MajorDropdown from "./components/majorDropdown.js";
import LinkButton from "./components/LinkButton.js";
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


export default function Home() {

  const majors = ['Business', 'Chemistry', 'Communications', 'Computer Science', 'Data Science', 'Economics', 'Math', 'Physics', 'Spanish', 'Statistics', 'Other'];
  const classes = ['BADM 310', 'BADM 320', 'FIN 221', 'CS 124', 'CS 128', 'CS 173', 'CS 225', 'MATH 241', 'STAT 107', 'STAT 207', 'CS 307', 'ECOn 102', 'ECON 202', 'ECON 203', 'ECON 302', 'CMN 102', 'SPAN 228', 'PHYS 211', 'PHYS 212', 'PHYS 225', 'PHYS 325'];
  const [selectedMajor, setSelectedMajor] = useState<string | null>(null);
  const handleSelect = (major: string) => {
    setSelectedMajor(major);  
    console.log("Selected Major:", major); 
  };
  return (<div>
    <Title/> 
  <MajorDropdown title={"Major"} options={majors} handleSelect={handleSelect}/> <Subtitle/>  <Dropdown title={"Classes Taken"} words={classes}/> <LinkButton/>
   </div>
  )
}
*/







/*

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly mwahahahahah.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}

*/
