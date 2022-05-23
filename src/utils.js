/**
 * Some util functions used within the app
 */

import moment from "moment";

moment.relativeTimeThreshold("ss", 59);
moment.relativeTimeThreshold("m", 59);
moment.relativeTimeThreshold("h", 23);
moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: function (number, withoutSuffix, key, isFuture) {
      return `${number} ${number > 1 ? "seconds" : "second"}`;
    },
    ss: "%d seconds",
    m: "1 minute",
    mm: "%d minutes",
    h: "1 hour",
    hh: "%d hours",
    d: "1 day",
    dd: "%d days",
    w: "1 week",
    ww: "%d weeks",
    M: "1 month",
    MM: "%d months",
    y: "1 year",
    yy: "%d years",
  },
});

const copyText = (text) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const tmp = document.createElement("TEXTAREA");
    tmp.value = text;
    document.body.appendChild(tmp);
    tmp.select();
    document.execCommand("copy");
    document.body.removeChild(tmp);
  }
};

const onClickOutside = (listening, setListening, menuRef, setIsOpen) => {
  return () => {
    if (listening) return;
    if (!menuRef.current) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(`click`, (evt) => {
        if (menuRef && menuRef.current && menuRef.current.contains(evt.target))
          return;
        setIsOpen(false);
      });
    });
  };
};

const shortenHex = (hex) => {
  return `${hex.slice(0, 10)}...`;
};

const formatTime = moment;

const getBlockTime = (blockObj) => {
  const timeString = blockObj.extrinsics[0].method.args.now.replace(/,/g, "");
  return Number(timeString);
};

const roundToMinutes = (date, period) => {
  const minutes = period === "1hr" ? 60 : period === "6hr" ? 360 : 1440;
  const coeff = 1000 * 60 * minutes;
  return new Date(Math.round(new Date(date).getTime() / coeff) * coeff);
};

const getBlockNumber = (signedBlock) => {
  const block = signedBlock.block.toHuman();
  return block.header.number.replace(/,/g, "");
};

const getExtrinsicParameters = (obj) => {
  let params = "";

  loopObj(obj);

  function loopObj(obj) {
    Object.entries(obj).forEach(([key, val]) => {
      params += `${key}: `;
      if (val && typeof val === "object") {
        loopObj(val);
      } else {
        params += `${val}; \n`;
      }
    });
  }
  return params;
};

const getHistoryDateRange = (period) => {
  let lowerDate, lowerDateString;
  const upperDate = new Date();
  const upperDateString = upperDate.toISOString();
  const upperDateTime = upperDate.getTime();
  const multiplier = period === "1hr" ? 24 : period === "6hr" ? 144 : 576;
  lowerDate = upperDateTime - 1000 * 60 * 60 * multiplier;
  lowerDateString = new Date(lowerDate).toISOString();

  return { lowerDateString, upperDateString };
};

const getUrlParameter = (name) => {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
};

export {
  copyText,
  onClickOutside,
  formatTime,
  shortenHex,
  getBlockTime,
  roundToMinutes,
  getBlockNumber,
  getExtrinsicParameters,
  getHistoryDateRange,
  getUrlParameter,
};
