import { useEffect, useState } from "react";
import { formatTime } from "../utils";
/**
 * Format time for static lists
 * @param {*} time
 * @returns relative time String
 */
export default function FormatedTime({ time }) {
  const [relativeTime, setRelativeTime] = useState(formatTime(time).fromNow());
  const timer = () => {
    setRelativeTime(formatTime(time).fromNow());
  };

  useEffect(() => {
    const id = setInterval(timer, 1000);
    return () => clearInterval(id);
  }, []);
  return <>{relativeTime}</>;
}
