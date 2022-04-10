import { bnToHex, formatBalance, hexToBn } from "@polkadot/util";
import groupBy from "lodash.groupby";
import { useEffect, useState } from "react";
import { subSquidQuery } from "../../libs/subsquid";
import { useSubstrateState } from "../../libs/substrate";
import { roundToMinutes } from "../../utils";
import Chart from "../charts/bar-chart";

export default function TransfersHistory({ period, setPeriod }) {
  const { api } = useSubstrateState();

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let isHistoryMounted = true;
    const getTransfers = async () => {
      let chainInfo = await api.registry.getChainProperties();

      chainInfo = chainInfo.toHuman();
      const decimals = chainInfo.tokenDecimals[0];
      const unit = chainInfo.tokenSymbol[0];

      const today = new Date().toISOString();

      const QUERY = `{
        substrate_event(limit: 10, where: {section: {_eq: "balances"}, method: {_eq: "Transfer"}, created_at: {_lte: "${today}"}}, order_by: {created_at: desc}) {
        data(path: ".param2")
        created_at
      }
    }`;
      const { data } = await subSquidQuery.post("", {
        query: QUERY,
      });

      if (data.errors) {
        console.error(data.errors);
      } else {
        let transfers = data.data.substrate_event;

        transfers = transfers.map((t) => ({
          ...t,
          groupTimestamp: roundToMinutes(t.created_at, period),
          value: t.data.value,
          // hex: hexToBigInt(t.data.value),
        }));

        const groupedTransfers = groupBy(transfers, (a) => a.groupTimestamp);
        let dataset = [];

        // console.log(groupedTransfers);

        for (let date in groupedTransfers) {
          dataset.push({
            timestamp: new Date(date).toISOString(),
            total: groupedTransfers[date].length,
            value: groupedTransfers[date].reduce(
              (prev, cur) => prev.value.add(hexToBn(cur.value)),
              hexToBn("0x00")
            ),
          });
        }

        console.log(dataset);
        const dd = bnToHex(dataset[0].value);
        console.log(dd);
        console.log(formatBalance(dd));
        if (isHistoryMounted) {
          setChartData(dataset);
        }
      }
    };

    getTransfers();
    return () => (isHistoryMounted = false);
  }, []);

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
      <Chart chartData={chartData} />
    </div>
  );
}
