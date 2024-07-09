'use client'

import { fakeLoader } from "@/core/lib/utils";

import React, { useState, useEffect } from "react";

const Loader = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [duration]);

  useEffect(() => {
    fakeLoader({ duration }).then(() => {
      setTimeLeft(0);
    });
  }, [duration]);

  return (
    <div>
      <div style={{ width: `${(1 - timeLeft / duration) * 100}%`, height: "10px", background: "blue" }}></div>
      <div>Time left: {timeLeft}ms</div>
    </div>
  );
};

export default Loader;