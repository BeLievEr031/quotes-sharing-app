import React, { useState } from "react";
import Style from "./Like.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Like({ quote }) {
  const [like, setLike] = useState(true);
  const handleUnLikeQuote = () => {
    setLike(!like);
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
            onClick={handleUnLikeQuote}
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
        autoClose={1000}
        hideProgressBar={true}
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

export default Like;
