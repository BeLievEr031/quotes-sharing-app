import React from "react";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./Profile.module.css";
import { DataContext } from "../../context/DataContextProvider";
import Pop from "../Pop/Pop";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Profile() {
  const navigate = useNavigate();
  const { userBaseUrl } = useContext(DataContext);
  let [dataToDisplay, setDataToDisplay] = useState("quotes");
  const { pop, setPop } = useContext(DataContext);
  const [userProfile, setUserProfile] = useState(null);
  const [quoteValue, setquoteValue] = useState("");

  const handlePopClosOpen = (quote) => {
    setPop(!pop);
    // quoteValue = quote.quote;
    setquoteValue(quote.quote)
    // handleToSetcurrUserQuotes(quote);
  };

  const handleToSetcurrUserQuotes = (quote) => {
    console.log(quote);
    // setcurrUserQuotes({
    //   quoteID: userProfile ? quote._id : "",
    //   quote: userProfile ? quote.quote : "",
    // });
  };

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("token");

      try {
        let res = await axios({
          method: "get",
          url: `${userBaseUrl}/profile`,
          headers: { token },
        });

        res = res.data;
        setUserProfile({
          ...res.user,
        });
        if (!res.success) {
          return toast.error(res.msg, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <div className={Style.profile_cont}>
        <div className={Style.user_cont}>
          <div className={Style.user_info}>
            <h2
              style={{
                diplay: "flex",
                justifyContent: "center",
              }}
            >
              Name:{userProfile ? userProfile.name : ""}
              <span
                className="material-symbols-outlined"
                style={{
                  cursor: "pointer",
                }}
              >
                edit
              </span>
            </h2>
            <h2>Email:{userProfile ? userProfile.email : ""}</h2>
          </div>

          <div className={Style.user_social}>
            <h3>Quotes: {userProfile ? userProfile.quotes.length : "0"}</h3>
            <h3>
              followers: {userProfile ? userProfile.follower.length : "0"}
            </h3>
            <h3>following: {userProfile ? userProfile.follow.length : "0"}</h3>
          </div>
        </div>

        <div className={Style.action_cont}>
          <div
            className={Style.my_quotes}
            onClick={() => {
              setDataToDisplay("quotes");
            }}
          >
            <h3>Quotes</h3>
          </div>

          <div
            className={Style.my_followers}
            onClick={() => {
              setDataToDisplay("followers");
            }}
          >
            <h3>Followers</h3>
          </div>
          <div
            className={Style.my_following}
            onClick={() => {
              setDataToDisplay("following");
            }}
          >
            <h3>Following</h3>
          </div>
        </div>

        <div className={Style.data_cont}>
          {(() => {
            if (dataToDisplay === "quotes") {
              return userProfile
                ? userProfile.quotes.map((quote, index) => {
                    return (
                      <div key={index} className={Style.quote_cont}>
                        <h3 className={Style.quote}>{quote.quote}</h3>
                        <div className={Style.action_btn}>
                          <span
                            onClick={() => handlePopClosOpen(quote)}
                            className="material-symbols-outlined"
                          >
                            edit_note
                          </span>
                          <span className="material-symbols-outlined">
                            delete_forever
                          </span>
                        </div>
                        <Pop handleToSetcurrUserQuotes={handleToSetcurrUserQuotes} action="update" quoteValue={quote} />
                      </div>
                    );
                  })
                : "";
            } else if (dataToDisplay === "followers") {
              return (
                <div className={Style.follower_cont}>
                  {userProfile
                    ? userProfile.follower.map((data, index) => {
                        return (
                          <div
                            key={index}
                            className={Style.follower_card}
                            onClick={() => {
                              navigate(`/profile`);
                            }}
                          >
                            <h2>sandeep Rajak</h2>
                          </div>
                        );
                      })
                    : "jkjoipj"}
                </div>
              );
            } else if (dataToDisplay === "following") {
              return (
                <div className={Style.follower_cont}>
                  {userProfile
                    ? userProfile.follow.map((data, index) => {
                        return (
                          <div
                            onClick={() => {
                              navigate("/profile");
                            }}
                            key={index}
                            className={Style.following_card}
                          >
                            <h2>sandeep Rajak</h2>
                            <span className="material-symbols-outlined">
                              cancel
                            </span>
                          </div>
                        );
                      })
                    : ""}
                </div>
              );
            }
          })()}
        </div>

        <span
          className="material-symbols-outlined"
          style={{
            position: "absolute",
            right: "10px",
            bottom: "10px",
            fontSize: "70px",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          logout
        </span>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default Profile;
