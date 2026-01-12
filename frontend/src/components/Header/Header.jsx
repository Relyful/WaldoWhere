import styles from './Header.module.css';
import { Link } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";

import ToastNotification from "../ToastNotification/ToastNotification";
import Footer from '../Footer/Footer';

function Header() {
  const [notification, setNotification] = useState(null);

  return (
    <>
      {notification && (
        <ToastNotification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <header>
        <div className={styles.logo}>WaldoWhere</div>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/leaderboard" className={styles.link}>
            Leaderboard
          </Link>
        </nav>
      </header>
      <main>
        <Outlet context={{ setNotification }} />
      </main>
      <Footer />
    </>
  );
}

export default Header;
