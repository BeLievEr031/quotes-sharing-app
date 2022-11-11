import React, { useState } from "react";
import Style from "./Otp.module.css";
import OTPInput, { ResendOTP } from "otp-input-react";
function Otp() {
  const [OTP, setOTP] = useState("");

  return (
    <>
      <div className={Style.otp_cont}>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
          secure
          inputStyles={{
            height: "50px",
            width: "50px",
            outline: "none",
          }}
        />

        <div className={Style.btn_cont}>
          <button onClick={() => console.log(OTP)}>Verify</button>
        </div>
      </div>
    </>
  );
}

export default Otp;
