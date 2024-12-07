import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { OTPResendTimer } from "./OTPResendTimer";

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  length = 6,
  onComplete,
}) => {
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(true);

  const handleChange = (otpValue: string) => {
    setOtp(otpValue);
    if (otpValue.length === length && onComplete) {
      onComplete(otpValue);
    }
  };

  const handleResendOTP = () => {
    setOtpSent(true);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <p className="text-sm text-gray-600">
        Enter the {length}-digit code sent to your E-mail
      </p>
      <OtpInput
        value={otp}
        onChange={handleChange}
        numInputs={length}
        renderSeparator={<span className="w-2"></span>}
        renderInput={(props) => <input {...props} />}
        inputStyle="!w-[51px] h-[56px] text-2xl border-2 border-gray-300 rounded focus:border-blue-500 focus:outline-none text-center"
        containerStyle="flex justify-center"
      />
      {otpSent && <OTPResendTimer onResend={handleResendOTP} />}
    </div>
  );
};
