import React from "react";
import styles from "./styles/footer.module.css";
import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <div className={styles.main_div}>
      <div className={styles.intro1}>
        <p>HELP US IN MAKING IT BETTER</p>
        <p>
          We welcome your participation in enhancing the directory further and
          also invite your comments and suggestions for improvement
        </p>
      </div>
      <div className={styles.footer_div}>
        <div className={styles.div1}>
          <p className={styles.p1}>Professional Career</p>
          <p className={styles.p2}>engineering</p>
          <p className={styles.p2}>management</p>
          <p className={styles.p2}>finance</p>
          <p className={styles.p2}>marketing</p>
          <p className={styles.p2}>data analysis</p>
          <p className={styles.p2}>human resources</p>
          <p className={styles.p2}>sales</p>
          <p className={styles.p2}>consulting</p>
          <p className={styles.p2}>product development</p>
          <p className={styles.p2}>software development</p>
          <p className={styles.p2}>customer service</p>
        </div>
        <div className={styles.div2}>
          <p className={styles.p1}>education</p>
          <p className={styles.p2}>primary education</p>
          <p className={styles.p2}>secondary education</p>
          <p className={styles.p2}>higher education</p>
          <p className={styles.p2}>vocational training</p>
          <p className={styles.p2}>special education</p>
          <p className={styles.p2}>online learning</p>
          <p className={styles.p2}>adult education</p>
          <p className={styles.p2}>educational technology</p>
          <p className={styles.p2}>teacher training</p>
          <p className={styles.p2}>research and development</p>
        </div>
        <div className={styles.div3}>
          <p className={styles.p1}>industries</p>
          <p className={styles.p2}>e-commerce</p>
          <p className={styles.p2}>automotive</p>
          <p className={styles.p2}>pharmaceuticals</p>
          <p className={styles.p2}>banking</p>
          <p className={styles.p2}>telecommunications</p>
          <p className={styles.p2}>retail</p>
          <p className={styles.p2}>construction</p>
          <p className={styles.p2}>energy</p>
          <p className={styles.p2}>entertainment</p>
          <p className={styles.p2}>aerospace</p>
        </div>
        <div className={styles.div4}>
          <p className={styles.p1}>Connect with us</p>
          <p className={styles.p2}>+91 -1800 1234 5678</p>
          <p className={styles.p2}>+91 -1800 3456 8768</p>{" "}
          <p className={styles.p2}>+91 -1800 4535 3534</p>
          <p className={styles.p2}>anoop@gmail.com</p>
          <p className={styles.p2}>anoop@vit.ac.in</p>{" "}
          <div className={styles.icons_div}>
            <FaGoogle className={styles.icons_div_icon} />
            <FaInstagram className={styles.icons_div_icon} />
            <FaFacebook className={styles.icons_div_icon} />
            <FaTwitter className={styles.icons_div_icon} />
          </div>
        </div>
      </div>
      <div className={styles.intro2}>
        <p>Developed by anoop chaudhary</p>

        <p>Designed by anoop chaudhary</p>
      </div>
    </div>
  );
}
