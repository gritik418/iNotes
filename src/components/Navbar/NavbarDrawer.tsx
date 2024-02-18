import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { NavItem } from "./Navbar";
import { Url } from "next/dist/shared/lib/router/router";
import styles from "./Navbar.module.css";
import { IoCloseOutline } from "react-icons/io5";

const NavbarDrawer = ({ isOpen, onClose, btnRef, navItems }: any) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <div className={styles.btnBox}>
            <IoCloseOutline onClick={onClose} className={styles.closeBtn} />
          </div>

          <DrawerBody style={{ marginTop: "20px" }}>
            <ul className={styles.drawerMenu}>
              {navItems.map((item: NavItem) => {
                return (
                  <Link
                    className={styles.drawerItem}
                    key={item.key as React.Key}
                    href={item.href as Url}>
                    <span className={styles.drawerIcon}>{item.icon}</span>
                    {item.name}
                  </Link>
                );
              })}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
