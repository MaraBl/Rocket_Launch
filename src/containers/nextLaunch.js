import React, { useState, useEffect } from "react";
import Timer from "../components/timer.js";
import CountDownItem from "../components/countDownItem.js";

const NextLaunch = () => {
  const [nextLaunchDate, setNextLaunchDate] = useState("");

  const URL = "https://api.spacexdata.com/v4/launches/next";

  let [isLoaded, setIsLoaded] = useState(false);
  let [err, setErr] = useState(null);
  let [isLaunched, setIsLaunched] = useState(false);
  let [missionName, setMissionName] = useState("");

  useEffect(() => {
    const todayDateEpoxFormat = new Date().getTime();
    const getNextLaunch = () => {
      fetch(URL)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then(
          (launch) => {
            //Test when API returns next launch date correctly. Commnted out line 29 and uncomment line 28. Refresh page
            //let nextLaunchDate = "2022-11-30T15:48:40.000Z";
            let nextLaunchDate = launch.date_local;
            let nextLaunchDateEpoxFormat = new Date(nextLaunchDate).getTime();
            let nextLaunchMissionName = launch.name;

            if (nextLaunchDateEpoxFormat >= todayDateEpoxFormat) {
              setNextLaunchDate(nextLaunchDate);
              setMissionName(nextLaunchMissionName);
              setIsLoaded(true);
            } else {
              setIsLaunched(true);
              setIsLoaded(true);
            }
          },
          (err) => {
            setErr(err);
            setIsLoaded(true);
          }
        );
    };
    getNextLaunch();
  }, []);

  const targetDate = nextLaunchDate;

  if (err) {
    return <div className="p-5"> {err.message} </div>;
  } else if (!isLoaded) {
    return <div className="p-5"> Loading... </div>;
  } else if (isLaunched) {
    return (
      <div className="nextLaunch">
        <p className="p-4 bg-white">
          Sorry...We do not have any information about next mission
        </p>
        <div className="row justify-content-center pt-4">
          <CountDownItem number={"-"} countItem="days" />
          <CountDownItem number={"-"} countItem="hours" />
          <CountDownItem number={"-"} countItem="minutes" />
          <CountDownItem number={"-"} countItem="seconds" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="nextLaunch">
        <p className="p-4 bg-white">Mission: {missionName}</p>
        <Timer targetDate={targetDate} />
      </div>
    );
  }
};

export default NextLaunch;
