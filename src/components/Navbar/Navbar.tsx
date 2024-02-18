"use client";
import React, { ReactElement, useRef } from "react";
import styles from "./Navbar.module.css";
import { IoHome } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import NavbarDrawer from "./NavbarDrawer";
import { FaHamburger } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { LuListTodo } from "react-icons/lu";
import Image from "next/image";

export type NavItem = {
  key: Number;
  name: String;
  icon?: ReactElement;
  href: String;
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navItems: NavItem[] = [
    {
      key: 0,
      name: "Home",
      icon: <IoHome />,
      href: "/",
    },
    {
      key: 1,
      name: "Notes",
      href: "/notes",
      icon: <SlNotebook />,
    },
    {
      key: 2,
      name: "To-do",
      href: "/todo",
      icon: <LuListTodo />,
    },
    {
      key: 3,
      icon: <FiLogIn />,
      name: "Login",
      href: "/login",
    },
    {
      key: 4,
      icon: <FaUserPlus />,
      name: "Sign Up",
      href: "/signup",
    },
  ];
  return (
    <nav className={styles.navbar}>
      <div className={`${"container"} ${styles.navContainer}`}>
        <Link href={"/"} className={styles.logo}>
          <Image src={"/images/logo.png"} alt="iNotes" width={40} height={40} />
          <h1>iNotes</h1>
        </Link>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            let useClass =
              item.name === "Sign Up"
                ? `${styles.navItemBg} ${styles.navItem}`
                : styles.navItem;
            return (
              <Link
                className={`${styles.link} ${useClass}`}
                key={item.key as React.Key}
                href={item.href as Url}>
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </ul>
        {/* @ts-ignore */}
        <span className={styles.hamburger} ref={btnRef} onClick={onOpen}>
          <FaHamburger />
        </span>
      </div>
      <NavbarDrawer
        isOpen={isOpen}
        navItems={navItems}
        btnRef={btnRef}
        onClose={onClose}
      />
    </nav>
  );
};

export default Navbar;
