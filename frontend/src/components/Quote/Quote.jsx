import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../../context/DataContextProvider";
import Style from "./Quote.module.css";
function Quotes({ quote, likesArr, setLikesArr, quotesArr, setQuotesArr }) {
  const [like, setLike] = useState(false);
  const { quoteBaseUrl } = useContext(DataContext);
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    let idx = quote.likes.indexOf(user._id);
    if (idx !== -1) {
      setLike(true);
    }
  }, []);

  const handleLikeQuote = async () => {
    try {
      const user = JSON.parse(window.localStorage.getItem("user"));
      let idx = quotesArr.findIndex((itrQuote) => {
        return itrQuote._id === quote._id;
      });

      let isLike = quote.likes.indexOf(user._id);

      if (isLike !== -1) {
        quote.likes.splice(isLike, 1);
        let idx = likesArr.findIndex((itrQuote) => {
          return itrQuote._id === quote._id;
        });
        likesArr.splice(idx, 1);
        setLikesArr([...likesArr]);
      } else {
        quote.likes.push(user._id);
        setLikesArr([
          ...likesArr,
          {
            ...quote,
          },
        ]);
      }

      quotesArr[idx] = quote;

      setQuotesArr([...quotesArr]);
      let res = await axios({
        method: "post",
        url: `${quoteBaseUrl}/like/${quote._id}`,
        headers: {
          token: window.localStorage.getItem("token"),
        },
      });

      res = res.data;
      if (!res.success) {
        return toast.error(res.msg, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      setLike(!like);
    } catch (error) {
      return toast.error(error.message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const handleCopyQuote = async () => {
    await navigator.clipboard.writeText(quote.quote);
    toast.success("Quote Copied", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      <div className={Style.quote_cont}>
        <h3 className={Style.author}>Author:{quote.author.name}</h3>
        <h2 className={Style.quote}>
          <span className={`material-symbols-outlined ${Style.rotate_span}`}>
            format_quote
          </span>
          {quote.quote}
          <span className={`material-symbols-outlined`}>format_quote</span>
        </h2>

        <div className={Style.action_btn}>
          <span
            className="material-symbols-outlined"
            style={like ? { color: "red" } : { color: "white" }}
            onClick={handleLikeQuote}
          >
            favorite
          </span>
          <span className="material-symbols-outlined" onClick={handleCopyQuote}>
            file_copy
          </span>
          <span className="material-symbols-outlined">share</span>
        </div>
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

export default Quotes;
