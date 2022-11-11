import React from "react";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import Style from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/DataContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Auth() {
  const navigate = useNavigate();
  const { setUser, userBaseUrl } = useContext(DataContext);
  const [auth, setAuth] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginRender = () => {
    setAuth(!auth);
  };

  const handleSetSignUpUser = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetLoginUser = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpUser = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${userBaseUrl}/signup`,
        data: signUpData,
      });

      console.log(res.data);
      res = res.data;
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

      setAuth(true);
      toast.success(res.msg, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
  };

  const handleLoginUser = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${userBaseUrl}/login`,
        data: loginData,
      });

      res = res.data;

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

      window.localStorage.setItem("token", res.token);
      window.localStorage.setItem("user", JSON.stringify(res.user));
      setUser({
        ...res.user,
      });

      navigate("/home");
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
  };
  
  return (
    <div className={Style.container}>
      {auth ? (
        <div className={Style.auth}>
          <h1>Login</h1>
          <input
            onChange={(e) => {
              handleSetLoginUser(e);
            }}
            value={loginData.email}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            onChange={(e) => {
              handleSetLoginUser(e);
            }}
            value={loginData.password}
            type="password"
            name="password"
            placeholder="password"
          />

          <button onClick={handleLoginUser} className={Style.btn}>
            Login
          </button>
          <span onClick={handleLoginRender} className={Style.login}>
            Create An Account
          </span>
        </div>
      ) : (
        <div className={Style.auth}>
          <h1>SignUp</h1>
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.name}
            type="text"
            name="name"
            placeholder="name"
          />
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.email}
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            onChange={(e) => {
              handleSetSignUpUser(e);
            }}
            value={signUpData.password}
            type="password"
            name="password"
            placeholder="password"
          />

          <button onClick={handleSignUpUser} className={Style.btn}>
            SignUp
          </button>
          <span onClick={handleLoginRender} className={Style.login}>
            login
          </span>
        </div>
      )}

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
    </div>
  );
}

export default Auth;
