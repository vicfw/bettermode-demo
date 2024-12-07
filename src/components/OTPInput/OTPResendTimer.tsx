import React, { useState, useEffect, useCallback } from "react";

interface OTPResendTimerProps {
  onResend: () => void;
}

export const OTPResendTimer: React.FC<OTPResendTimerProps> = ({ onResend }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsActive(false);
    }
  }, [timeLeft]);

  const handleResend = useCallback(() => {
    onResend();
    setTimeLeft(60);
    setIsActive(true);
  }, [onResend]);

  return (
    <div className="mt-4 text-left w-full">
      {isActive ? (
        <p className="text-sm text-gray-600">
          Resend code (available in {timeLeft} seconds)
        </p>
      ) : (
        <button
          onClick={handleResend}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none focus:underline"
        >
          Resend code
        </button>
      )}
    </div>
  );
};
