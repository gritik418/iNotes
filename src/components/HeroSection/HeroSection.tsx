import React from "react";
import styles from "./HeroSection.module.css";
import Image from "next/image";

const HeroSection = ({
  content,
  title,
  image,
  reversed,
}: {
  content: string;
  title: string;
  image: string;
  reversed?: boolean;
}) => {
  return (
    <section className={styles.container}>
      {reversed ? (
        <>
          <div className={styles.contentBox}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
          </div>
          <div className={styles.imageBox}>
            <Image
              src={image}
              className={styles.roundedImage}
              alt="image"
              height={320}
              width={340}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.imageBox}>
            <Image src={image} alt="image" height={340} width={280} />
          </div>
          <div className={styles.contentBox}>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.content}>{content}</p>
          </div>
        </>
      )}
    </section>
  );
};

export default HeroSection;
