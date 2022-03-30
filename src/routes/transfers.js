import { useState } from "react";
import TransfersHistory from "../components/transfers/history";
import TransfersList from "../components/transfers/list";

export default function Transfers() {
  const [period, setPeriod] = useState("1hr");
  return (
    <div className="page mb-40">
      <TransfersHistory period={period} setPeriod={setPeriod} />
      <TransfersList />
      <div className="mt-40 mb-40"></div>
    </div>
  );
}
