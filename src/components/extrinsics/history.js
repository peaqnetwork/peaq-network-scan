import { useEffect, useState } from "react";

import { subSquidQuery } from "../../libs/subsquid";
import { roundToMinutes } from "../../utils";
import groupBy from "lodash.groupby";
import Chart from "../charts/bar-chart";

export default function ExtrinsicsHistory() {
  const [period, setPeriod] = useState("1hr");
  const [chartData, setChartData] = useState([]);

  const getDateRange = (period) => {
    let lowerDate, lowerDateString;
    const upperDate = new Date();
    const upperDateString = upperDate.toISOString();
    const upperDateTime = upperDate.getTime();
    const multiplier = period === "1hr" ? 24 : period === "6hr" ? 144 : 576;
    lowerDate = upperDateTime - 1000 * 60 * 60 * multiplier;
    lowerDateString = new Date(lowerDate).toISOString();

    return { lowerDateString, upperDateString };
  };

  useEffect(() => {
    let isHistoryMounted = true;
    const getExtrinsics = async (period) => {
      const { lowerDateString, upperDateString } = getDateRange(period);

      const QUERY = `{
          substrate_extrinsic(where: {created_at: {_gt: "${lowerDateString}", _lt: "${upperDateString}"}}) {
            created_at
          }
        }`;
      const { data } = await subSquidQuery.post("", {
        query: QUERY,
      });

      if (data.errors) {
        console.error(data.errors);
      } else {
        const extrinsicsTimestamps = data.data.substrate_extrinsic.map((ts) =>
          roundToMinutes(ts.created_at, period)
        );
        const groupedTimestamps = groupBy(extrinsicsTimestamps);
        let dataset = [];

        for (let date in groupedTimestamps) {
          dataset.push({
            timestamp: new Date(date).toISOString(),
            total: groupedTimestamps[date].length,
          });
        }
        dataset = dataset.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        if (isHistoryMounted) {
          setChartData(dataset);
        }
      }
    };

    getExtrinsics(period);
    return () => (isHistoryMounted = false);
  }, [period]);

  return (
    <div className="bordered-content-box extrinsics-history">
      <h3 className="text-white">Extrinsics history</h3>
      <div>
        <span
          className={`button tiny pointer ${period === "1hr" ? "active" : ""}`}
          onClick={() => setPeriod("1hr")}
        >
          1H
        </span>
        <span
          className={`button tiny pointer ${period === "6hr" ? "active" : ""}`}
          onClick={() => setPeriod("6hr")}
        >
          6H
        </span>
        <span
          className={`button tiny pointer ${period === "1dy" ? "active" : ""}`}
          onClick={() => setPeriod("1dy")}
        >
          1D
        </span>
      </div>
      <Chart chartData={chartData} />
    </div>
  );
}
