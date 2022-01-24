import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import getApi from "../libs/api";
import {
  setLatestBlocks,
  setExistingBlock,
} from "../store/slices/latest-blocks-slice";
import { setCurrentBlockNumber } from "../store/slices/current-block-number-slice";

export default function Blocks() {
  const latestBlocks = useSelector((state) => state.latestBlocks.value);
  const currentBlockNumber = useSelector(
    (state) => state.currentBlockNumber.value
  );

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeAll = null;

    const getBlocks = async () => {
      const api = await getApi();

      unsubscribeAll = await api.rpc.chain.subscribeAllHeads((header) => {
        // console.log(`Chain is at block: #${header.number}`);
        const blockNumber = header.number.toNumber();
        const hash = header.hash.toHex();

        // console.log("header", header.toHuman());

        // Get number of extrinsics
        api.rpc.chain
          .getBlock(hash)
          .then((signedBlock) => {
            // console.log("block", signedBlock.toHuman());

            // Get block finality

            const extrinsicsCount = signedBlock.block.extrinsics.length;
            // console.log(extrinsicsCount);

            // Get number of events
            api.query.system.events
              .at(hash)
              .then((allRecords) => {
                signedBlock.block.extrinsics.forEach((method, index) => {
                  // filter the specific events based on the phase and then the
                  // index of our extrinsic in the block
                  const events = allRecords.filter(
                    ({ phase }) =>
                      phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
                  );
                  const eventsCount = events.length;

                  // if blocknumber is less than current block number:
                  // // replace that block with current data.
                  // // else add new block

                  if (blockNumber > currentBlockNumber) {
                    dispatch(
                      setLatestBlocks({
                        blockNumber,
                        extrinsicsCount,
                        eventsCount,
                        time: new Date().toString(),
                        hash,
                      })
                    );
                    dispatch(setCurrentBlockNumber(blockNumber));
                  }
                  // else {
                  //   dispatch(
                  //     setExistingBlock({
                  //       blockNumber,
                  //       extrinsicsCount,
                  //       eventsCount,
                  //       time: new Date().toString(),
                  //       hash,
                  //     })
                  //   );

                  //   console.log(
                  //     "previous/repeated block",
                  //     blockNumber,
                  //     "extrinsics",
                  //     extrinsicsCount,
                  //     "events",
                  //     eventsCount,
                  //     "extr",
                  //     signedBlock.block.extrinsics,
                  //     "evnt",
                  //     events
                  //   );
                  // }
                });
              })
              .catch(console.error);
          })
          .catch(console.error);
      });
    };
    getBlocks();

    return () => unsubscribeAll && unsubscribeAll();
  }, []);

  return (
    <div className="page">
      {/* <div className="block-list-search-container d-flex">
        <div className="">
          <span>All</span>
        </div>
        <p className="text-dark-white">Search bar placeholder</p>
      </div> */}
      <div className="blocks-list">
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
              <tr key={block.blockNumber}>
                <td className="">
                  <span className="text-accent-purple">
                    {block.blockNumber}
                  </span>
                </td>
                {/* <td>
                  <span>
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
                  </span>
                </td> */}
                <td className="text-dark-white text-small">
                  <div className="d-flex align-items-center">
                    <span className="mr-3">{dayjs(block.time).fromNow()}</span>
                  </div>
                </td>
                <td className="text-accent-purple text-small">
                  {block.extrinsicsCount}
                </td>
                <td className="text-accent-purple text-small">
                  {block.eventsCount}
                </td>
                {/* <td>validator</td> */}
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
