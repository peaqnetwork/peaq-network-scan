import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSubstrateState } from "../libs/substrate";
import useGetBlocks from "../libs/chain/use-getblocks";
import FormatedTime from "../components/formated-time";

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
              <th>Status</th>
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
                <td>
                  {block.isFinalized ? (
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
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C6.47 22 2 17.5 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"
                        fill="#D19113"
                      />
                    </svg>
                  )}
                </td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">
                      <FormatedTime time={block.time} />
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
