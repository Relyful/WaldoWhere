import { Link } from "react-router";

export default function Homepage() {
  return (
    <>
      <h1>Welcome to WaldoWhere</h1>
      <Link to='/game'>Start</Link>
    </>
  )
}