import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constant";

const Header = () => {
  return (
    <div className="flex justify-between bg-pink-100 shadow-lg">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="flex items-center">
        <ul className="flex m-4 p-4">
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
