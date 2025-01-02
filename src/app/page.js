"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { FaArrowAltCircleDown, FaDownload, FaDropbox } from "react-icons/fa";

export default function Home() {
  const [pdfText, setPdfText] = useState("");
  const [textData, setTextData] = useState("");
  const [fileName, setFileName] = useState("");
  const [data, setData] = useState("");
  const [isloading, setIsloading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      extractTextFromPDF(file);
    }
  };

  const extractTextFromPDF = async (file) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      const typedArray = new Uint8Array(event.target.result);
      const pdf = await pdfjsLib.getDocument(typedArray).promise;

      let fullText = "";
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item) => item.str).join(" ");
        fullText += pageText + "\n";
      }

      setPdfText(fullText); // Save extracted text to state
    };

    reader.readAsArrayBuffer(file); // Read file as array buffer
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = `
Convert the following unstructured text into a structured document in JSON format.

Sample Resume Data
John Doe
123 Main Street, Cityville, NY 56789
Email: john.doe@example.com | Phone: (123) 456-7890
LinkedIn: linkedin.com/in/johndoe | GitHub: github.com/johndoe

Professional Summary
Innovative and deadline-driven Software Engineer with 5+ years of experience designing and developing scalable applications. Adept at collaborating with cross-functional teams to deliver high-quality software solutions.

Skills
Programming Languages: JavaScript, Python, Java, C++
Frameworks & Libraries: React.js, Node.js, Django, Express
Tools: Git, Docker, Jenkins, Kubernetes
Databases: MySQL, MongoDB, PostgreSQL
Other: Agile Methodologies, RESTful APIs, CI/CD, Cloud Services (AWS, Azure)
Work Experience
Senior Software Engineer
XYZ Tech Solutions, New York, NY
January 2020 – Present

Led the design and implementation of a large-scale customer management system, improving user retention by 30%.
Optimized application performance, reducing API response times by 40%.
Collaborated with cross-functional teams to ensure project delivery on time and within budget.
Mentored junior developers and conducted code reviews to uphold quality standards.
Software Developer
ABC Innovations, San Francisco, CA
July 2017 – December 2019

Developed and maintained web applications using React and Node.js.
Automated data processing workflows, reducing manual effort by 25%.
Integrated third-party APIs to enhance application functionality.
Participated in Agile ceremonies and contributed to sprint planning and retrospectives.
Education
Bachelor of Science in Computer Science
University of Example, Cityville, NY
Graduated: May 2017

Certifications
AWS Certified Solutions Architect – Associate
Certified Kubernetes Administrator (CKA)
Projects
E-commerce Platform

Built a fully functional e-commerce application with React and Node.js.
Integrated payment gateways and implemented user authentication.
Task Management System

Designed a task-tracking app using Python and Django.
Implemented real-time updates with WebSocket support.

`;
    const data1 = { prompt };
    setIsloading(true);
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/resume/getResume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text1: pdfText,
            textData: textData,
          }),
        }
      );

      const result = await response.json();

      console.log(result);
      // alert(result.data);
      setData(result.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
    setIsloading(false);
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.fileinput}>
          <h1 className={styles.des1}>Is your resume good enough?</h1>
          <h2 className={styles.des2}>
            A free and fast AI resume checker doing 16 crucial checks to ensure
            your resume is ready to perform and get you interview callbacks.
          </h2>

          <textarea
            className={styles.input}
            value={textData}
            onChange={(e) => setTextData(e.target.value)}
            placeholder="Enter job description"
          ></textarea>
          <div className={styles.block}>
            <FaArrowAltCircleDown className={styles.icon} />
            <p className={styles.title}>Upload Your Resume Above</p>
          </div>
          <input
            type="file"
            accept="application/pdf"
            className={styles.hiddenInput}
            onChange={handleFileChange}
          />
        </div>
        <div className={styles.resultdiv}>
          <p className={styles.name1}>
            {isloading ? "Reading your resume.. " : "Completed"}
          </p>
          <CircularProgress
            percentage={
              data.job_description_match <= 10 ? 20 : data.job_description_match
            }
          />
          <h1 className={styles.score}>
            Resume Score{" "}
            {data.job_description_match <= 10 ? 20 : data.job_description_match}
          </h1>
          <button onClick={handleSubmit} className={styles.btn1}>
            {isloading ? "Please wait ..." : "Check"}
          </button>
          {/* {data && data.personal_information.name} */}
        </div>
        {fileName && <h2 className={styles.file}>Uploaded File: {fileName}</h2>}
      </div>
    </div>
  );
}

const CircularProgress = ({ percentage = 0 }) => {
  const radius = 140; // Radius of the circle
  const strokeWidth = 35; // Width of the stroke
  const normalizedRadius = radius - strokeWidth / 2; // Adjust for stroke width
  const circumference = 2 * Math.PI * normalizedRadius; // Circumference of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference; // Offset based on percentage

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      style={{ transform: "rotate(-0deg)" }} // Rotate to start at the top
    >
      {/* Background Circle */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#e6e6e6" // Light gray background
        strokeWidth={strokeWidth}
      />
      {/* Progress Circle */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#4caf50" // Progress color
        strokeWidth={strokeWidth}
        strokeDasharray={circumference} // Total length of the circle
        strokeDashoffset={strokeDashoffset} // Adjusted length based on percentage
        strokeLinecap="round" // Rounded edges for the stroke
      />
      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="18px"
        fill="#333"
      >
        {percentage}%
      </text>
    </svg>
  );
};
