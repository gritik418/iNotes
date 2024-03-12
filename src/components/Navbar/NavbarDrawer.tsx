import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";
import Link from "next/link";
import { NavItem } from "./Navbar";
import { Url } from "next/dist/shared/lib/router/router";
import styles from "./Navbar.module.css";
import { IoCloseOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";

const NavbarDrawer = ({ isOpen, onClose, btnRef, navItems }: any) => {
  const pathName = usePathname();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContainer}>
          <div className={styles.btnBox}>
            <IoCloseOutline onClick={onClose} className={styles.closeBtn} />
          </div>

          <DrawerBody style={{ marginTop: "20px" }}>
            <ul className={styles.drawerMenu}>
              {navItems.map((item: NavItem) => {
                if (item.display) {
                  return (
                    <Link
                      style={{
                        fontWeight: `${
                          pathName === item.href ? "bolder" : "400"
                        }`,
                        fontSize: `${pathName === item.href ? "22px" : "18px"}`,
                        backgroundColor: `${
                          pathName === item.href ? "var(--primary-medium)" : ""
                        }`,
                      }}
                      className={styles.drawerItem}
                      key={item.key as React.Key}
                      href={item.href as Url}>
                      <span className={styles.drawerIcon}>{item.icon}</span>
                      {item.name}
                    </Link>
                  );
                } else {
                  return;
                }
              })}
            </ul>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavbarDrawer;
