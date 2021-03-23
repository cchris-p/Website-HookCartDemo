import React, { useEffect, useState } from "react";
import "./style.css";
import hookcartLogo from "../../images/logo/hookcart-logo.png";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategory } from "../../actions";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import Cart from "../UI/Cart";

/**
 * @author
 * @function MenuHeader
 **/

const MenuHeader = (props) => {
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);

  // state cart value
  const cart = useSelector((state) => state.cart);

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={<a className="fullName">{auth.user.fullName}</a>}
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "SuperCoin Zone", href: "", icon: null },
          { label: "HookCart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "My Chats", href: "", icon: null },
          { label: "Coupons", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Notifications", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
          { label: "Logout", href: "", icon: null, onClick: logout },
        ]}
      />
    );
  };

  const renderNonLoggedInMenu = () => {
    return (
      <DropdownMenu
        menu={
          <a
            className="loginButton"
            onClick={() => {
              setSignup(false);
              setLoginModal(true);
            }}
          >
            <i class="fas fa-user" style={{ fontSize: "28px" }}></i>
          </a>
        }
        menus={[
          { label: "My Profile", href: "", icon: null },
          { label: "HookCart Plus Zone", href: "", icon: null },
          {
            label: "Orders",
            href: `/account/orders`,
            icon: null,
            onClick: () => {
              !auth.authenticate && setLoginModal(true);
            },
          },
          { label: "Wishlist", href: "", icon: null },
          { label: "Rewards", href: "", icon: null },
          { label: "Gift Cards", href: "", icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>New Customer?</span>
            <a
              onClick={() => {
                setLoginModal(true);
                setSignup(true);
              }}
              style={{ color: "#D42626" }}
            >
              Sign Up
            </a>
          </div>
        }
      />
    );
  };

  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId ? (
            <a
              href={`/${category.slug}?cid=${category._id}&type=${category.type}`}
            >
              {category.name}
            </a>
          ) : (
            <span>{category.name}</span>
          )}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  return (
    <div className="menuHeader">
      <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
              <div className="loginInputContainer">
                {auth.error && (
                  <div style={{ color: "red", fontSize: 12 }}>{auth.error}</div>
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                )}
                {signup && (
                  <MaterialInput
                    type="text"
                    label="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                )}

                <MaterialInput
                  type="text"
                  label="Email/Mobile Number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MaterialInput
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // rightElement={<a href="#">Forgot?</a>}
                />
                <MaterialButton
                  title={signup ? "Register" : "Login"}
                  bgColor="#fb641b"
                  textColor="#ffffff"
                  style={{
                    margin: "40px 0 20px 0",
                  }}
                  onClick={userLogin}
                />
                <p style={{ textAlign: "center" }}>OR</p>
                <MaterialButton
                  title="Sign Up"
                  bgColor="#ffffff"
                  textColor="#D42626"
                  style={{
                    margin: "20px 0",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="leftMenu">
        <a href="/">
          <img src={hookcartLogo}></img>
        </a>
        <a href="/">
          <h2>
            SHOP&nbsp;&nbsp;
            <i
              class="fas fa-chevron-down"
              style={{ fontSize: "14px", color: "silver" }}
            ></i>
          </h2>
        </a>
        <a href="/">
          <h2>
            BRANDS&nbsp;&nbsp;
            <i
              class="fas fa-chevron-down"
              style={{ fontSize: "14px", color: "silver" }}
            ></i>
          </h2>
        </a>
      </div>
      <div className="mobileLeftMenu">
        <a>
          <i class="fas fa-bars"></i>
        </a>
        <a href="/">
          <img src={hookcartLogo} style={{ height: "30px" }}></img>
        </a>
      </div>

      <div className="rightMenu">
        <button>
          <i
            class="fas fa-search"
            style={{
              fontSize: "28px",
              color: "grey",
              marginBottom: "2px",
              '&hover': {
                color: 'black',
              }
            }}
          ></i>
        </button>
        {auth.authenticate ? renderLoggedInMenu() : renderNonLoggedInMenu()}

        <DropdownMenu
          menu={
            <a className="more">
              <i
                class="fas fa-layer-group"
                style={{
                  fontSize: "28px",
                  color: "light grey",
                  marginBottom: "2px",
                }}
              ></i>
            </a>
          }
          menus={[
            { label: "Notification Preference", href: "", icon: null },
            { label: "Sell on HookCart", href: "", icon: null },
            { label: "24x7 Customer Care", href: "", icon: null },
            { label: "Advertise", href: "", icon: null },
            { label: "Download App", href: "", icon: null },
          ]}
        />
        <div>
          <a href={`/cart`} className="cart">
            <Cart count={Object.keys(cart.cartItems).length} />
            {/* <i class="fas fa-shopping-cart"></i> */}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuHeader;
