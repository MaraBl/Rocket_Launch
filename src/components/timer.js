import React, { useState, useEffect } from "react";
import CountDownItem from "./countDownItem.js";
import ShareSocial from "./shareSocial.js";

const Timer = (props) => {
  const countDownDate = new Date(props.targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return (
    <div>
      <div className="row justify-content-center pt-4">
        <CountDownItem number={days} countItem="days" />
        <CountDownItem number={hours} countItem="hours" />
        <CountDownItem number={minutes} countItem="minutes" />
        <CountDownItem number={seconds} countItem="seconds" />
      </div>
      <ShareSocial />
    </div>
  );
};

export default Timer;
