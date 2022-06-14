import { useEffect, useState } from "react";
import { subSquidGraphServer } from "../../libs/subsquid";
import config from "../../config";
import { useSubstrateState } from "../../libs/substrate";
import { shortenHex } from "../../utils";
import { formatBalance } from "@polkadot/util";
import Pagination from "../pagination/pagination";
import InfoPlaceholder from "../info-placeholder";
import { Link } from "react-router-dom";
import FormatedTime from "../formated-time";

export default function TransfersList() {
  const limit = config.ITEMS_PER_PAGE;
  const maxPageSize = config.MAX_PAGE_SIZE;
  const [transfers, setTransfers] = useState([]);
  const [isFetchingTransfers, setIsFetchingTransfers] = useState(false);
  const [endCursor, setEndCursor] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [pageOffset, setPageOffset] = useState(0);

  const { api } = useSubstrateState();

  const handleChangePage = ({ selected }) => {
    const cursor = selected <= 0 ? "" : String(selected * 10);
    setEndCursor(cursor);
    setPageOffset(selected);
  };

  useEffect(() => {
    setIsFetchingTransfers(true);
    let isListMounted = true;
    const getTransfers = async () => {
      let chainInfo = await api.registry.getChainProperties();

      chainInfo = chainInfo.toHuman();
      const decimals = Number(chainInfo.tokenDecimals[0]);
      const unit = chainInfo.tokenSymbol[0];

      const QUERY = `{
        transfersConnection(first: ${limit}, orderBy: createdAt_DESC, after: "${endCursor}") {
          edges {
            cursor
            node {
              amount
              id
              blockNumber
              createdAt
              extrinsicHash
              extrinsicIndex
              from
              success
              to
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          totalCount
        }
      }`;
      const { data } = await subSquidGraphServer.post("", {
        query: QUERY,
      });

      setIsFetchingTransfers(false);

      if (data.errors) {
        console.error(data.errors);
      } else {
        const { edges, totalCount } = data.data.transfersConnection;
        let pageCount = Math.ceil(totalCount / limit);
        if (pageCount >= maxPageSize) pageCount = maxPageSize;

        const transfers = edges.map((e) => ({
          ...e.node,
          cursor: e.cursor,
          amount: formatBalance(e.node.amount, { decimals }).replace(
            "Unit",
            unit
          ),
        }));
        if (isListMounted) {
          setTransfers(transfers);
          setPageCount(pageCount);
        }
      }
    };

    getTransfers();
    return () => (isListMounted = false);
  }, [api.registry, endCursor, limit]);

  return (
    <>
      {isFetchingTransfers ? (
        <InfoPlaceholder text="Loading transfers..." isListContainer />
      ) : (
        <div className="extrinsics-list bordered-content-box scroll-x list-container">
          <table className="table">
            <thead>
              <tr>
                <th className="no-wrap">Extrinsic Id</th>
                <th>Block</th>
                <th>Time</th>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
                <th>Result</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {transfers.map(
                ({
                  blockNumber,
                  createdAt,
                  extrinsicIndex,
                  extrinsicHash,
                  from,
                  to,
                  amount,
                  success,
                  id,
                }) => (
                  <tr key={id}>
                    <td className="text-accent-purple">
                      <Link to={`/extrinsic/${blockNumber}-${extrinsicIndex}`}>
                        {blockNumber}-{extrinsicIndex}
                      </Link>
                    </td>
                    <td className="text-accent-purple">
                      <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
                    </td>
                    <td className="text-dark-white">
                      <FormatedTime time={createdAt} />
                    </td>
                    <td className="text-accent-purple">{shortenHex(from)}</td>
                    <td className="text-accent-purple">{shortenHex(to)}</td>
                    <td className="text-dark-white">{amount}</td>
                    <td>
                      {success ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                            fill="#24D180"
                          />
                        </svg>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="text-accent-purple">
                      {shortenHex(extrinsicHash)}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="d-flex justify-content-end">
        <div></div> {/* Downloads component  */}
        <Pagination
          pageCount={pageCount}
          pageOffset={pageOffset}
          handleChangePage={handleChangePage}
        />
      </div>
    </>
  );
}
