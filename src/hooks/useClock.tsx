import React, { useState, useEffect } from "react";
import moment from "moment";

const useClock = (clockIntervalMs: number = 1000) => {
  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, clockIntervalMs);

    return () => clearInterval(secTimer);
  }, [clockIntervalMs]);

  return moment(dt);
};

export default useClock;
