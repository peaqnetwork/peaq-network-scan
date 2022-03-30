import { useEffect, useState } from "react";
import { subSquidQuery } from "../../libs/subsquid";
import config from "../../config";
import { useSubstrateState } from "../../libs/substrate";
import { formatTime, shortenHex } from "../../utils";
import { formatBalance } from "@polkadot/util";
import Pagination from "../pagination/pagination";
import InfoPlaceholder from "../info-placeholder";

export default function TransfersList() {
  const limit = config.ITEMS_PER_PAGE;
  const [transfers, setTransfers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isFetchingTransfers, setIsFetchingTransfers] = useState(false);

  const { api } = useSubstrateState();
  const offset = (pageNumber - 1) * 10;
  useEffect(() => {
    setIsFetchingTransfers(true);
    let isListMounted = true;
    const getTransfers = async () => {
      let chainInfo = await api.registry.getChainProperties();

      chainInfo = chainInfo.toHuman();
      const decimals = chainInfo.tokenDecimals[0];
      const unit = chainInfo.tokenSymbol[0];

      const QUERY = `{
        substrate_event(where: {section: {_eq: "balances"}, _and: {method: {_eq: "Transfer"}}}, order_by: {created_at: desc}, limit: ${limit}, offset: ${offset}) {
          extrinsicIndex
          blockNumber
          created_at
          extrinsicHash
          data
          phase
        }
      }`;
      const { data } = await subSquidQuery.post("", {
        query: QUERY,
      });

      setIsFetchingTransfers(false);

      if (data.errors) {
        console.error(data.errors);
      } else {
        let transfers = data.data.substrate_event;

        transfers = transfers.map((t) => ({
          ...t,
          value: formatBalance(t.data.param2.value, decimals)?.replace(
            "Unit",
            unit
          ),
          //   // result: api.events.system.ExtrinsicSuccess.is(),
        }));
        if (isListMounted) {
          setTransfers(transfers);
        }
      }
    };

    getTransfers();
    return () => (isListMounted = false);
  }, [api.registry, limit, offset]);

  if (isFetchingTransfers) {
    return <InfoPlaceholder text="Loading transfers..." />;
  }

  return (
    <>
      <div className="extrinsics-list bordered-content-box scroll-x">
        <table className="table">
          <thead>
            <tr>
              <th className="no-wrap">Extrinsic Id</th>
              <th>Block</th>
              <th>Time</th>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
              {/* <th>Result</th> */}
              <th>Hash</th>
            </tr>
          </thead>
          <tbody>
            {transfers.map(
              ({
                blockNumber,
                created_at,
                extrinsicIndex,
                extrinsicHash,
                data,
                value,
              }) => (
                <tr key={extrinsicHash}>
                  <td className="text-accent-purple">
                    {blockNumber}-{extrinsicIndex}
                  </td>
                  <td className="text-accent-purple">{blockNumber}</td>
                  <td className="text-dark-white">
                    {formatTime(created_at).fromNow()}
                  </td>
                  <td className="text-accent-purple">
                    {shortenHex(data?.param0.value)}
                  </td>
                  <td className="text-accent-purple">
                    {shortenHex(data?.param1.value)}
                  </td>
                  <td className="text-dark-white">{value}</td>
                  {/* <td></td> */}
                  <td className="text-accent-purple">
                    {shortenHex(extrinsicHash)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div></div> {/* Downloads component  */}
        <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      </div>
    </>
  );
}
