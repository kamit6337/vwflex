"use client";
import { useEffect, useRef } from "react";

const OtpInput = ({ otp, cb }) => {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    // a regular expression that matches a single digit (0-9) or ""
    if (/^\d$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      cb(newOtp);

      // Move to next input if not the last input
      if (value && index < 7) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2">
      {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            maxLength={1}
            required={true}
            value={value}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleChange(e, index)}
            className="flex h-[48px] items-center auth_input text-center"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
