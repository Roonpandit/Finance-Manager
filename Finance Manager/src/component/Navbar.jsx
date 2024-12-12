import { Link } from "react-router-dom";
import "../App.css";
import "../index.css"
import logo from "../logo.png"
export function Navbar() {
  return (
    <>
      <div className="navbar">
        <div >
          <Link to ={"/"}>
         <img src={logo} alt="" />
        <span>Tarun</span>
          </Link>
        
        </div>
        
      <Link className="home"
          to={"/summary"}
        >
          SUMMARY{" "}
        </Link>
        <Link className="income"
          to={"/income"}
        >
          INCOME{" "}
        </Link>
        <Link className="expenses"
          
          to={"/expense"}
        >
          EXPENSES{" "}
        </Link>
        <Link
          className="transaction"
          to={"/transaction"}
        >
          TRANSACTION{" "}
        </Link>
      </div>
    </>
  );
}
