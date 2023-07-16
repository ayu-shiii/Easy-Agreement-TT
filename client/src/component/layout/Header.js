import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, logout } from "../../actions/userActions";
import logo from "../../images/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const dispatch = useDispatch();
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

  // const { user, loading, isAuthenticated, error } = useSelector(
  //   (state) => state.user
  // );

  // useEffect(() => {
  //   if (error) {
  //     window.alert(error);
  //     dispatch(clearErrors());
  //   }
  // }, [dispatch, error]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <nav class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">
            <Link to="/">
              <img className="nav-logo" src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <ul class="nav-list">
          <li>
            <a href="/">home</a>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/summary">summarize contracts</Link>
            </li>
          ) : (
            <li>
              <Link to="/about">about</Link>
            </li>
          )}
          <li>
            <Link to="/subscription">subscription plan</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/summaries">{user.name}</Link>
            </li>
          ) : (
            <li>
              <Link onClick={() => loginWithRedirect()}>login</Link>
            </li>
          )}
          {isAuthenticated && (
            <li>
              {/* <a href="/" onClick={handleLogout}>
                logout
              </a> */}
              {isAuthenticated && <Link onClick={() => logout()}>log out</Link>}
            </li>
          )}
        </ul>
      </nav>
    </Fragment>
  );
};

export default Header;
