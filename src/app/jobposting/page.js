"use client";
import { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";

export default function JobForm() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    description: "",
    department: "",
    location: "",
    employmentType: "",
    salaryRange: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://atsbackend-c36c.onrender.com/api/v1/job/postJob",
        formData
      );
      console.log("Job posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Post a Job</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.d1}>
            <label>Job Title</label>
            <textarea
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className={styles.i1}
              placeholder="Enter job title"
            ></textarea>
          </div>
          <div className={styles.d1}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Enter job description"
              className={styles.i1}
            ></textarea>
          </div>
          <div className={styles.d1}>
            <label>Department</label>
            <textarea
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="Enter job department"
              className={styles.i1}
            ></textarea>
          </div>
          <div className={styles.d1}>
            <label>Location</label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter job location"
              className={styles.i1}
            ></textarea>
          </div>
          <div className={styles.d1}>
            <label>Employment Type</label>
            <textarea
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              required
              placeholder="Enter employement type"
              className={styles.i1}
            ></textarea>
          </div>
          <div className={styles.d1}>
            <label>Salary Range</label>
            <textarea
              name="salaryRange"
              value={formData.salaryRange}
              onChange={handleChange}
              required
              placeholder="Enter job salary range"
              className={styles.i1}
            ></textarea>
          </div>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
}
