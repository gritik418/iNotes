import React, { ReactElement } from "react";
import styles from "./Navbar.module.css";
import { IoHome } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa";

type NavItem = {
  key: Number;
  name: String;
  icon?: ReactElement;
};

const Navbar = () => {
  const navItems: NavItem[] = [
    {
      key: 0,
      name: "Home",
      icon: <IoHome />,
    },
    {
      key: 1,
      name: "Notes",
    },
    {
      key: 2,
      icon: <FiLogIn />,
      name: "Login",
    },
    {
      key: 3,
      icon: <FaUserPlus />,
      name: "Sign Up",
    },
  ];
  return (
    <nav className={styles.navbar}>
      <div className={`${"container"} ${styles.navContainer}`}>
        <div className={styles.logo}>
          <h1>iNotes</h1>
        </div>
        <ul className={styles.navList}>
          {navItems.map((item) => {
            let useClass =
              item.name === "Sign Up"
                ? `${styles.navItemBg} ${styles.navItem}`
                : styles.navItem;
            return (
              <li key={item.key as React.Key} className={useClass}>
                <span className={styles.icon}>{item.icon}</span>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
