import styles from "./page.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
    </main>
  );
}
