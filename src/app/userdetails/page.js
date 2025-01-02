"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activepage, setActivepage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/resume/getAllResume"
        ); // Example API
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result.data); // Set the fetched data to state
      } catch (error) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className={styles.main}>
      <div className={styles.div1}>
        <h1 className={styles.name}>All Resume</h1>
        <ul className={styles.ul}>
          {data.slice(0, 10).map((item, val) => (
            <li
              key={item._id}
              className={styles.li}
              onClick={() => {
                setActivepage(val);
              }}
            >
              {/* if(item.data.type === "personal_information") */}
              <p>
                {val + 1} --- {item.data.personal_information.name}
              </p>
              <p>{item.data.personal_information.email}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.div2}>
        <p className={styles.title}>Serial Number</p>
        <p className={styles.val1}>{activepage + 1}</p>
        <p className={styles.title}>Name</p>
        <p className={styles.val1}>
          {data[activepage].data.personal_information.name}
        </p>
        <p className={styles.title}>Email</p>
        <p className={styles.val1}>
          {data[activepage].data.personal_information.name}
        </p>
        <p className={styles.title}>Education</p>
        <p className={styles.val1}>
          {JSON.stringify(data[activepage].data.education)}
        </p>
        <p className={styles.title}>Skills</p>
        <p className={styles.val1}>
          {JSON.stringify(data[activepage].data.skills)}
        </p>
        <p className={styles.title}>Experience</p>
        <p className={styles.val1}>
          {JSON.stringify(data[activepage].data.experience)}
        </p>
        <p className={styles.title}>Rating</p>
        <p className={styles.val1}>
          {JSON.stringify(data[activepage].data.job_description_match)}
        </p>
      </div>
    </div>
  );
}
