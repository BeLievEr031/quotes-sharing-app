import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContextProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Style from "./Pop.module.css";
function Pop({
  handleToSetcurrUserQuotes,
  action,
  quoteValue,
  quotesArr,
  setQuotesArr,
}) {
  console.log(quoteValue);

  const token = window.localStorage.getItem("token");
  const { pop, setPop, quoteBaseUrl } = useContext(DataContext);
  const [currQuote, setCurrQuote] = useState(quoteValue);
  const handlePopClosOpen = () => {
    setPop(!pop);
  };
  const handleQuoteChange = (e) => {
    setCurrQuote(e.target.value);
  };

  const handleUploadPost = async () => {
    try {
      let res = await axios({
        method: "post",
        url: `${quoteBaseUrl}/create`,
        headers: { token },
        data: {
          quote: currQuote,
        },
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

      setQuotesArr([
        ...quotesArr,
        {
          ...res.newQuote,
        },
      ]);

      setPop(!pop);
    } catch (error) {
      return toast.error(error.message, {
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

  const handleUpdatePost = async () => {
    try {
      // console.log(quoteValue);
      handleToSetcurrUserQuotes(quoteValue);
    } catch (error) {
      return toast.error(error.message, {
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
    <>
      {pop ? (
        <div className={Style.create_pop_cont}>
          <div className={Style.pop}>
            <div className={Style.top_pop_bar}>
              <h1>
                {action === "create" ? "Create a quote" : "Update a quote"}
              </h1>
              <span
                className="material-symbols-outlined"
                onClick={handlePopClosOpen}
              >
                close
              </span>
            </div>

            <h3 className={Style.author_info}>Author: Sandeep Rajak</h3>

            <div className={Style.textarea}>
              <textarea
                value={currQuote ? currQuote.quote : ""}
                placeholder="Write your quote here..."
                name="quote"
                onChange={(e) => handleQuoteChange(e)}
              ></textarea>
            </div>
            <div className={Style.action}>
              <button
                onClick={
                  action === "create" ? handleUploadPost : handleUpdatePost
                }
              >
                {action === "create" ? "Post" : "Update"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
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
    </>
  );
}

export default Pop;
