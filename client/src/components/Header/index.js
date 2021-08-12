/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import "./style.css";

/**
 * @author
 * @function Header
 **/
const Header = (props) => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // useEffect(() => {}, [isActive]);

  return (
    <div className="header">
      <div className="header-comp">
        <a href="/">
          <p>
            <i className="fas fa-phone-volume"></i>&nbsp;&nbsp;8 800 799 99 99
          </p>
        </a>
        <button onClick={() => setIsActive(!isActive)}>
          <p>
            <i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Store in Seattle,
            WA&nbsp;&nbsp;
            <i class="fas fa-caret-down"></i>
          </p>
        </button>
        <div
          ref={dropdownRef}
          className={`showMenu ${isActive ? "active" : "inactive"}`}
        >
          <p>Map is here</p>
        </div>
      </div>
      <div className="header-comp">
        <a href="/">
          <p>Daily Deals</p>
        </a>
        <a href="/">
          <p>FAQ</p>
        </a>
        <a href="/">
          <p>Support</p>
        </a>
      </div>
    </div>
  );
};

export default Header;
