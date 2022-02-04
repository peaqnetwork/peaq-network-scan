import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { setLatestBlocks } from "../store/slices/latest-blocks-slice";
import { setCurrentBlockNumber } from "../store/slices/current-block-number-slice";
import { Link } from "react-router-dom";
import { useSubstrateState } from "../libs/substrate";

export default function Blocks() {
  const latestBlocks = useSelector((state) => state.latestBlocks.value);
  const currentBlockNumber = useSelector(
    (state) => state.currentBlockNumber.value
  );

  dayjs.extend(relativeTime);

  const dispatch = useDispatch();

  const { api } = useSubstrateState();

  useEffect(() => {
    let unsubscribeAll = null;

    const getBlocks = async () => {
      // const api = await getApi();

      unsubscribeAll = await api.rpc.chain.subscribeAllHeads((header) => {
        // console.log(`Chain is at block: #${header.number}`);
        const blockNumber = header.number.toNumber();
        const hash = header.hash.toHex();

        // Get number of extrinsics
        api.rpc.chain
          .getBlock(hash)
          .then((signedBlock) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page">
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
                  <Link
                    to={`/block/${block.blockNumber}`}
                    className="text-accent-purple"
                  >
                    {block.blockNumber}
                  </Link>
                </td>
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
