import { Link } from "react-router";
import { Outlet } from "react-router";


function Header() {
  return (
    <>
      <header>
        <div className="logo">Rely&apos;s Game</div>
        <nav className="nav">
          <Link to='/' className="link">Home</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        Made by Rely
      </footer>
    </>
  )
}

export default Header;