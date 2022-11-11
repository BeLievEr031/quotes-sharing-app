import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import Style from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
function Navbar() {
  const navigate = useNavigate();
  const { setAction } = useContext(DataContext);
  const [activeNav, setActiveNav] = useState({
    quotes: true,
    like: false,
    profile: false,
    search: false,
  });
  const handleToAddLikeQuoteToMainDataArr = () => {
    setNavIcon("like");
    setAction("like");
    // setMainDataArr([...like]);
  };

  const handleToAddQuoteToMainDataArr = () => {
    setNavIcon("quotes");
    setAction("quotes");
  };

  const setNavIcon = (activeNav) => {
    if (activeNav === "quotes") {
      setActiveNav({
        quotes: true,
        like: false,
        profile: false,
      });
    } else if (activeNav === "like") {
      setActiveNav({
        quotes: false,
        like: true,
        profile: false,
      });
    } else if (activeNav === "profile") {
      setActiveNav({
        quotes: false,
        like: false,
        profile: true,
      });
    }
  };



  return (
    <nav>
      <div className={Style.icon_cont} onClick={handleToAddQuoteToMainDataArr}>
        <span
          style={
            activeNav.quotes
              ? {
                  fontSize: "35px",
                  color: "#985EFF",
                }
              : {
                  color: "#FFFFFF",
                  fontSize: "35px",
                }
          }
          className="material-symbols-outlined"
        >
          all_inbox
        </span>
        <b>Quotes</b>
      </div>

      <div
        className={Style.icon_cont}
        onClick={handleToAddLikeQuoteToMainDataArr}
      >
        <span
          style={
            activeNav.like
              ? {
                  fontSize: "35px",
                  color: "#985EFF",
                }
              : {
                  color: "#FFFFFF",
                  fontSize: "35px",
                }
          }
          className="material-symbols-outlined"
        >
          thumb_up
        </span>
        <b>Like</b>
      </div>

      <div className={Style.icon_cont}>
        <span
          style={{
            fontSize: "35px",
          }}
          className="material-symbols-outlined"
        >
          search
        </span>
        <b>search</b>
      </div>
      <div
        className={Style.icon_cont}
        onClick={() => {
          navigate("/profile");
        }}
      >
        <span
          style={
            activeNav.profile
              ? {
                  fontSize: "35px",
                  color: "#985EFF",
                }
              : {
                  fontSize: "35px",
                  color: "#FFFFFF",
                }
          }
          className="material-symbols-outlined"
        >
          person
        </span>
        <b>profile</b>
      </div>
    </nav>
  );
}

export default Navbar;
