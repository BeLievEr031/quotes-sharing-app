import React from "react";
import { useContext } from "react";
import Create from "../Create/Create";
import Navbar from "../Navbar/Navbar";
import Quote from "../Quote/Quote";
import { DataContext } from "../../context/DataContextProvider";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Like from "../Like/Like";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Style from "./Home.module.css";
function Home() {
  const { action, quoteBaseUrl, userBaseUrl } = useContext(DataContext);
  const [quoteOfTheDay, setQuoteOfTheDay] = useState(null);
  const [quotesArr, setQuotesArr] = useState([]);
  const [likesArr, setLikesArr] = useState([]);
  // useEffect(() => {
  //   const fetchQuoteOfTheDay = async () => {
  //     console.log(31);
  //     let res = await axios({
  //       method: "get",
  //       url: "https://type.fit/api/quotes",
  //     });
  //     setQuoteOfTheDay([...res.data]);
  //   };
  //   fetchQuoteOfTheDay();
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const token = window.localStorage.getItem("token");

      try {
        let res = await axios({
          method: "get",
          url: `${quoteBaseUrl}/`,
          headers: { token },
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

        setQuotesArr([...res.quotes]);
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

        setLikesArr([...res.user.likeQuotes]);
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
      <div className={Style.home}>
        <div className={Style.top_bar}>
          <Create quotesArr={quotesArr} setQuotesArr={setQuotesArr} />
          <Navbar />
        </div>

        <div className={Style.data_cont}>
          <aside>
            <div className={Style.quote_of_the_day_cont}>
              <h3 className={Style.quote_of_day}>Random Quote</h3>
              <div className={Style.quote}>
                <h1>
                  {quoteOfTheDay === null
                    ? "There are no failures just experiences and your reactions to them."
                    : quoteOfTheDay[
                        Math.floor(Math.random() * quoteOfTheDay.length - 1)
                      ].text}
                </h1>
              </div>
            </div>

            <div className={Style.top_quoter_cont}>
              <h3 className={Style.quote_of_day}>Top Quoters</h3>

              <div className={Style.quoter_name}>
                <ul>
                  <li>
                    <h1>Ankul Chaturvedi</h1>
                  </li>
                  <li>
                    <h1>Suyash mishra</h1>
                  </li>
                  <li>
                    <h1>anish jha </h1>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <div className={Style.quote_cont}>
            {action === "quotes"
              ? quotesArr.map((quote, index) => {
                  return (
                    <Quote
                      quote={quote}
                      key={index}
                      quotesArr={quotesArr}
                      setQuotesArr={setQuotesArr}
                      likesArr={likesArr}
                      setLikesArr={setLikesArr}
                    />
                  );
                })
              : likesArr.map((quote, index) => {
                  return <Like quote={quote} key={index} />;
                })}
          </div>
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

export default Home;
