import newOTP from "otp-generators";

const otpGen = () => {
  return newOTP.generate(6, {
    alphabets: false,
    upperCase: false,
    specialChar: false,
  });
};

export default otpGen;
