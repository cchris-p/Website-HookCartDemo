/* eslint-disable */

import React, { useEffect, useState } from "react";
import "./style.css";
import { IoIosArrowDown, IoIosCart, IoIosSearch } from "react-icons/io";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";

/**
 * @author
 * @function Header
 **/
const Header = (props) => {
  return (
    <div className="header">
      <div className="header-comp">
        <a href="/">
          <p>
            <i className="fas fa-phone-volume"></i>&nbsp;&nbsp;8 800 799 99 99
          </p>
        </a>
        <a href="/">
          <p>
            <i class="fas fa-map-marker-alt"></i>&nbsp;&nbsp;Store in Seattle, WA
          </p>
        </a>
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
