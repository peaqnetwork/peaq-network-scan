import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSubstrateState } from "../libs/substrate";
import useGetBlocks from "../libs/chain/use-getblocks";
import { formatTime } from "../utils";

export default function Blocks() {
  const latestBlocks = useSelector((state) => state.latestBlocks.value);
  const { api } = useSubstrateState();

  useGetBlocks(api);

  return (
    <div className="page">
      <div className="blocks-list above-footer">
        <table className="table">
          <thead>
            <tr>
              <th>Block</th>
              {/* <th>Status</th> */}
              <th>Time</th>
              <th>Extrinsics</th>
              <th>Events</th>
              {/* <th>Validator</th> */}
              <th>Block hash</th>
            </tr>
          </thead>
          <tbody>
            {latestBlocks.map((block) => (
              <tr key={`${block.blockNumber}-${Math.random()}`}>
                <td className="">
                  <Link
                    to={`/block/${block.blockNumber}`}
                    className="text-accent-purple"
                  >
                    {block.blockNumber}
                  </Link>
                </td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">
                      {formatTime(block.time).fromNow()}
                    </span>
                  </div>
                </td>
                <td className="text-accent-purple text-small">
                  {block.extrinsicsCount}
                </td>
                <td className="text-accent-purple text-small">
                  {block.eventsCount}
                </td>
                <td>
                  <span className="text-accent-purple">
                    {block.hash.slice(0, 10)}...
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
