"use client";
import React, { useState } from "react";
import styles from "./styles/appbar.module.css";
import Link from "next/link";
import { FaBars, FaInstagram } from "react-icons/fa";

export default function Appbar() {
  const [isopen, setIsopen] = useState(false);
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>ATStracker</h1>
      <ul className={isopen ? styles.list1 : styles.list2}>
        <li>
          <Link
            href="/"
            className={styles.link}
            onClick={() => {
              setIsopen(!isopen);
            }}
          >
            Resume
          </Link>
        </li>
        <li>
          <Link
            href="/userdetails"
            className={styles.link}
            onClick={() => {
              setIsopen(!isopen);
            }}
          >
            Users
          </Link>
        </li>{" "}
        <li>
          <Link
            href="/jobposting"
            className={styles.link}
            onClick={() => {
              setIsopen(!isopen);
            }}
          >
            Jobs
          </Link>
        </li>{" "}
      </ul>
      <button className={styles.btn}>Contact</button>
      <FaBars
        className={styles.menu}
        onClick={() => {
          setIsopen(!isopen);
        }}
      />
    </div>
  );
}
