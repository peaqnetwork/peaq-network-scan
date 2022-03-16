import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSubstrateState } from "../libs/substrate";
import useGetBlocks from "../libs/chain/use-getblocks";
import { formatTime } from "../utils";

export default function BlocksLatest() {
  const latestBlocks = useSelector((state) => state.latestBlocks.value);

  const { api } = useSubstrateState();

  useGetBlocks(api);

  return (
    <div className="latest-blocks">
      <div className="d-flex justify-content-space-between align-items-center">
        <div className="d-flex align-items-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.372 5.65874L13.3765 1.6214C12.5241 1.12687 11.4767 1.12636 10.6243 1.62086L10.6233 1.6214L3.62509 5.66036L3.6234 5.66135C3.23412 5.88738 2.9133 6.20003 2.67991 6.56659C2.65832 6.59417 2.63839 6.62359 2.62037 6.6548C2.6041 6.68299 2.58986 6.7118 2.57762 6.74106C2.36607 7.13425 2.25 7.57904 2.25 8.03989V16.1198C2.25 17.0985 2.77353 18.0049 3.6234 18.4983L3.6251 18.4993L10.6233 22.5383L10.6243 22.5388C11.4767 23.0333 12.5233 23.0333 13.3757 22.5388L13.3765 22.5383L20.3748 18.4993L20.3765 18.4983C21.2263 18.0049 21.7499 17.0985 21.7499 16.1198V8.03989C21.7499 7.56024 21.6264 7.0978 21.4002 6.69346C21.3937 6.68046 21.3868 6.66757 21.3794 6.6548C21.3712 6.64056 21.3625 6.62669 21.3536 6.61319C21.1177 6.22315 20.7838 5.89201 20.372 5.65874ZM3.75 8.17298V16.1198C3.75 16.5607 3.98615 16.9741 4.37583 17.2007L11.2499 21.168V12.5028L3.75 8.17298ZM11.9999 11.2038L19.4882 6.88062L12.625 2.91957L12.6233 2.91859C12.2362 2.6938 11.7637 2.6938 11.3765 2.91859L11.3748 2.91957L4.51158 6.88063L11.9999 11.2038ZM20.2499 8.17291L12.7499 12.5029V21.168L19.6233 17.2011C20.0129 16.9745 20.2499 16.5607 20.2499 16.1198V8.17291Z"
              fill="#706CFF"
            />
          </svg>

          <h3 className="ml-3">Latest blocks</h3>
        </div>
        <Link to="/block" className="button small">
          All
        </Link>
      </div>
      <div>
        <table className="table">
          <tbody>
            {latestBlocks.map((block) => (
              <tr key={`${block.blockNumber}-${Math.random()}`}>
                <td className="text-large">
                  Block#{" "}
                  <Link
                    to={`/block/${block.blockNumber}`}
                    className="text-accent-purple text-decoration-none"
                  >
                    {block.blockNumber}
                  </Link>
                </td>
                <td className="text-accent-purple text-small">
                  {block.extrinsicsCount} Extrinsic
                </td>
                <td className="text-accent-purple text-small">
                  {block.eventsCount} events
                </td>
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">
                      {formatTime(block.time).fromNow()}
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20ZM12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM17 13.9L16.3 15.2L11 12.3V7H12.5V11.4L17 13.9Z"
                        fill="#979798"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
