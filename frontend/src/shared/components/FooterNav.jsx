import React from "react";
import styles from "../../features/posts/style.module.css"; // Ajusta la ruta si es necesario
import { Link } from "react-router-dom";

export default function FooterNav() {
  return (
    <nav className={styles.footerNav}>
      <Link to="/" className={styles.navItem}>Inicio</Link>
      <Link to="/publicar" className={styles.navItem}>Publicar</Link>
      <Link to="/chat" className={styles.navItem}>Chat</Link>
      <Link to="/perfil" className={styles.navItem}>Perfil</Link>
    </nav>
  );
}