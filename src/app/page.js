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

    const data1 = { prompt };
    setIsloading(true);
    try {
      const response = await fetch(
        "https://atsbackend-c36c.onrender.com/api/v1/resume/getResume",
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
            <p className={styles.title}>Upload Your Resume </p>
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
  const radius = 140;
  const strokeWidth = 35;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
      style={{ transform: "rotate(-0deg)" }}
    >
      {/* Background Circle */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
      />
      {/* Progress Circle */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="transparent"
        stroke="#4caf50"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
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
