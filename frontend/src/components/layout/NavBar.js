import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import logo from "../img/cifrao.png";
export default function NavBar() {
  return (
    <div className={styles.nav}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="Costs" />
      </Link>

      <div className={styles.links}>
        <Link to="/" className={styles.link}>
          Home
        </Link>

        <Link to="/contact" className={styles.link}>
          Contato
        </Link>

        <Link to="/company" className={styles.link}>
          Empresa
        </Link>

        <Link to="/projects" className={styles.link}>
          Projetos
        </Link>
      </div>
    </div>
  );
}
