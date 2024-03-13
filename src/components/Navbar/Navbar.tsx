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
import { useDispatch, useSelector } from "react-redux";
import {
  resetUser,
  selectIsLoggedIn,
  selectUser,
} from "@/features/user/userSlice";
import { resetTodos } from "@/features/todo/todoSlice";
import { resetNotes } from "@/features/notes/notesSlice";

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
  const dispatch = useDispatch<any>();

  const userData = useSelector(selectUser);

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

  function deleteAllCookies() {
    var c = document.cookie.split("; ");
    for (let i in c)
      document.cookie =
        /^[^=]+/.exec(c[i])![0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  const logout = () => {
    // deleteAllCookies();
    dispatch(resetNotes());
    dispatch(resetTodos());
    dispatch(resetUser());
  };
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
        </ul>
        {isLoggedIn && userData && (
          <li className={styles.listItem} style={{ margin: "0 18px" }}>
            <span className={styles.icon}></span>
            <Menu>
              <MenuButton className={styles.menuBtn}>
                {userData?.avatar ? (
                  <Avatar
                    bg={"#9459ed"}
                    color={"white"}
                    size={"lg"}
                    icon={
                      <Image
                        src={userData.avatar}
                        height={50}
                        width={50}
                        alt="profile"
                      />
                    }
                    className={styles.avatar}
                  />
                ) : (
                  <Avatar
                    bg={"#9459ed"}
                    color={"white"}
                    size={"lg"}
                    icon={<FaRegUser className={styles.avatarIcon} />}
                    className={styles.avatar}
                  />
                )}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout} className={styles.menuItem}>
                  <MdLogout className={styles.menuImage} />
                  <span>Logout</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </li>
        )}
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
