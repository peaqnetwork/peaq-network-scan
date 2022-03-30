import { useState } from "react";

export default function TransfersHistory({ period }) {
  return (
    <div className="bordered-content-box extrinsics-history mb-40">
      <h3 className="text-white">Transfers history</h3>
      <div>
        <span
          className={`button tiny pointer ${period === "1hr" ? "active" : ""}`}
          // onClick={() => setPeriod("1hr")}
        >
          1H
        </span>
        <span
          className={`button tiny pointer ${period === "6hr" ? "active" : ""}`}
          // onClick={() => setPeriod("6hr")}
        >
          6H
        </span>
        <span
          className={`button tiny pointer ${period === "1dy" ? "active" : ""}`}
          // onClick={() => setPeriod("1dy")}
        >
          1D
        </span>
      </div>
      {/* <Chart chartData={chartData} /> */}
    </div>
  );
}
