import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { quote, like } from "../utils/data";
const DataContext = createContext();
function DataContextProvider({ children }) {
  const navigate = useNavigate();
  const [quoteArr, setquoteArr] = useState([...quote.quotes]);
  const [likeArr, setLikeArr] = useState([...like]);
  const [pop, setPop] = useState(false);
  const [action, setAction] = useState("quotes");
  const [token, setToken] = useState(null);
  let [user, setUser] = useState(null);

  const userBaseUrl = "http://localhost:5000/api/v1/user";
  const quoteBaseUrl = "http://localhost:5000/api/v1/quote";

  useEffect(() => {
    if (
      window.localStorage.getItem("token") !== null &&
      window.localStorage.getItem("user") !== null
    ) {
      setUser(JSON.parse(window.localStorage.getItem("user")));
      navigate("/home");
      setToken(window.localStorage.getItem("token"));
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        quoteArr,
        setquoteArr,
        action,
        setAction,
        likeArr,
        setLikeArr,
        pop,
        setPop,
        user,
        setUser,
        userBaseUrl,
        quoteBaseUrl,
        token,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataContextProvider };
