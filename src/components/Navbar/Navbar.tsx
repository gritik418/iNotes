"use client";
import React, { ReactElement, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { IoHome } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import NavbarDrawer from "./NavbarDrawer";
import { FaHamburger } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { LuListTodo } from "react-icons/lu";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "@/features/user/userSlice";

export type NavItem = {
  key: Number;
  name: String;
  icon?: ReactElement;
  href: String;
  display: boolean;
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const btnRef = useRef();
  const pathName = usePathname();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navItems: NavItem[] = [
    {
      key: 0,
      name: "Home",
      icon: <IoHome />,
      href: "/",
      display: true,
    },
    {
      key: 1,
      name: "Notes",
      href: "/notes",
      icon: <SlNotebook />,
      display: true,
    },
    {
      key: 2,
      name: "To-do",
      href: "/todo",
      icon: <LuListTodo />,
      display: true,
    },
    {
      key: 3,
      icon: <FiLogIn />,
      name: "Login",
      href: "/login",
      display: isLoggedIn ? false : true,
    },
    {
      key: 4,
      icon: <FaUserPlus />,
      name: "Sign Up",
      href: "/signup",
      display: isLoggedIn ? false : true,
    },
  ];

  const userData = { avatar: "" };
  const logout = () => {
    //   setIsLoggedIn(false);
  };

  // const user = async () => {
  //   const response = await getUser();
  //   if (response.success) {
  //     setIsLoggedIn(true);
  //     setUserData(response.user);
  //   }
  // };

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     return;
  //   }
  //   user();
  // }, [isLoggedIn]);
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
            if (item.display) {
              return (
                <Link
                  style={{
                    fontWeight: `${pathName === item.href ? "bolder" : "400"}`,
                    fontSize: `${pathName === item.href ? "22px" : "18px"}`,
                  }}
                  className={`${styles.link} ${useClass}`}
                  key={item.key as React.Key}
                  href={item.href as Url}>
                  <span className={styles.icon}>{item.icon}</span>
                  {item.name}
                </Link>
              );
            }
            return;
          })}
          {isLoggedIn && userData && (
            <li className={styles.listItem}>
              <span className={styles.icon}></span>
              <Menu>
                <MenuButton className={styles.menuBtn}>
                  <Avatar
                    bg={"#9459ed"}
                    color={"white"}
                    size={"lg"}
                    icon={<FaRegUser className={styles.avatarIcon} />}
                    className={styles.avatar}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem className={styles.menuItem}>
                    <Image
                      width={40}
                      height={40}
                      className={styles.menuImage}
                      src={userData?.avatar}
                      alt="Fluffybuns the destroyer"
                    />
                    <span>Your Profile</span>
                  </MenuItem>

                  <MenuItem onClick={logout} className={styles.menuItem}>
                    <MdLogout className={styles.menuImage} />
                    <span>Logout</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </li>
          )}
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
