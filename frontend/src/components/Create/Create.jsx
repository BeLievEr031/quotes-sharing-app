import React, { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContextProvider";
import Pop from "../Pop/Pop";
import Style from "./Create.module.css";
function Create({ quoteValue, quotesArr, setQuotesArr }) {
  const { pop, setPop } = useContext(DataContext);
  const handlePopClosOpen = () => {
    setPop(!pop);
  };

  const handleQuoteChange = (e) => {
    setCurrQuote(e.target.value);
  };
  return (
    <>
      <div className={Style.create} onClick={handlePopClosOpen}>
        <div className={Style.icon_cont}>
          <span
            style={{
              fontSize: "35px",
            }}
            className="material-symbols-outlined"
          >
            file_upload
          </span>
          <b>post quote</b>
        </div>
      </div>

      <Pop
        action="create"
        quoteValue={quoteValue}
        quotesArr={quotesArr}
        setQuotesArr={setQuotesArr}
      />
    </>
  );
}

export default Create;
