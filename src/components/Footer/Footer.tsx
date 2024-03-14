import React from "react";
import styles from "./Footer.module.css";
import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";
import { FaRegCopyright } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className="container">
        <div className={styles.group}>
          <div className={styles.logo}>
            <Image
              src={"/images/logo.png"}
              height={40}
              width={40}
              alt="iNotes"
              className={styles.image}
            />
            iNotes
            <span>
              <FaRegCopyright className={styles.copy} />
              2024 | iNotes
            </span>
          </div>
          <div className={styles.links}>
            <Link href={"https://www.linkedin.com/in/ritik-gupta-849680251/"}>
              <FaLinkedinIn className={styles.icon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
