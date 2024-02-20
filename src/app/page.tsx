"use client";

import HeroSection from "@/components/HeroSection/HeroSection";
import styles from "./page.module.css";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  const el = useRef(null);
  const router = useRouter();

  const redirectTo = (link: string) => {
    router.push(link);
  };

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Unlock the power of knowledge with our intuitive note-taking platform.",
        "Organize your thoughts, ideas, and inspirations effortlessly.",
        "Capture ideas as they come and watch your productivity soar.",
        "Your ideas, your notes, your way - all in one place.",
        "Simplify your life with our seamless note-taking experience.",
        "From lectures to brainstorming sessions, never miss a detail again.",
        "Streamline your workflow and amplify your creativity with our note-taking solution.",
        "Transform chaos into clarity with our easy-to-use note organization tools.",
        "Take notes smarter, not harder, with our user-friendly interface.",
        "Elevate your learning journey with personalized note-taking features.",
        "Say goodbye to scattered thoughts and hello to organized brilliance.",
        "Harness the power of digital notes to keep your ideas within reach, anytime, anywhere.",
        "Let your ideas flourish with our flexible and customizable note-taking platform.",
        "Experience the joy of seamless note-taking - your productivity's new best friend.",
        "Empower yourself with the ultimate tool for capturing, organizing, and sharing your ideas.",
      ],
      typeSpeed: 30,
      loop: true,
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className={styles.mainSection}>
        <div className="container">
          <div className={styles.group}>
            <h1 className={styles.heading}>
              Create and Organize your
              <span className={styles.richText}>Notes</span>
              over the <span className={styles.richText}>Internet</span> for
              <span className={styles.richText}>Free.</span>
            </h1>
            <div className={styles.typedContainer}>
              <span ref={el} className={styles.typedStrings} />
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <HeroSection
          content="Create clear, multi-functional notes to easily manage your ideas and work from anywhere so you never forget anything again."
          title="Access & Organize your Notes from anywhere."
          image="/images/mobile.png"
        />

        <span className={styles.divider}></span>

        <HeroSection
          content="Create your notes for free with iNotes anytime and anywhere, so you will never miss a task or idea again."
          title="Never miss a task or idea again."
          image="/images/notes.jpg"
          reversed={true}
        />
      </div>

      <div className={styles.section}></div>

      <div className="container">
        <div className={styles.sectionGroup}>
          <h2 className={styles.info}>
            <span className={styles.richText}>Unlock </span> access to
            <span className={styles.richText}>iNotes</span>
            and Keep your<span className={styles.richText}>Notes</span> over the{" "}
            <span className={styles.richText}>Internet,</span> take all of your
            thoughts
            <span className={styles.richText}>anytime</span> and
            <span className={styles.richText}>anywhere</span> for
            <span className={styles.richText}>free</span> by
            <span className={styles.richText}> signing up today!</span>
          </h2>
          <button className={styles.btn} onClick={() => redirectTo("/signup")}>
            Sign Up <FaLongArrowAltRight className={styles.icon} />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
