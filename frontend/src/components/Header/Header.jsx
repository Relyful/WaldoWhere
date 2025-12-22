import { Link } from "react-router";
import { Outlet } from "react-router";
import { useState } from "react";

import ToastNotification from "../ToastNotification/ToastNotification";

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
        <div className="logo">Rely&apos;s Game</div>
        <nav className="nav">
          <Link to="/" className="link">
            Home
          </Link>
        </nav>
      </header>
      <main>
        <Outlet context={{ setNotification }} />
      </main>
      <footer>Made by Rely</footer>
    </>
  );
}

export default Header;
