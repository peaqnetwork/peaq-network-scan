/**
 * Some util functions used within the app
 */

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

const formatTime = dayjs.extend(relativeTime);

const getBlockTime = (blockObj) => {
  const timeString = blockObj.extrinsics[0].method.args.now.replace(/,/g, "");
  return Number(timeString);
};

export { copyText, onClickOutside, formatTime, shortenHex, getBlockTime };
