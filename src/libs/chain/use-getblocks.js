import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLatestBlocks } from "../../store/slices/latest-blocks-slice";
import { setCurrentBlockNumber } from "../../store/slices/current-block-number-slice";
import { getBlockTime } from "../../utils";

export default function useGetBlocks(api) {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeAll = null;

    const getBlocks = async () => {
      // const api = await getApi();

      const bestNumberFinalized = await api.derive.chain.bestNumberFinalized();

      unsubscribeAll = await api.rpc.chain.subscribeAllHeads((header) => {
        const blockNumber = header.number.toNumber();
        const hash = header.hash.toHex();

        // Get number of extrinsics
        api.rpc.chain
          .getBlock(hash)
          .then((signedBlock) => {
            const extrinsicsCount = signedBlock.block.extrinsics.length;

            // Get number of events
            api.query.system.events
              .at(hash)
              .then((allRecords) => {
                const eventsCount = allRecords.length;
                dispatch(
                  setLatestBlocks({
                    blockNumber,
                    isFinalized: blockNumber < bestNumberFinalized.toNumber(),
                    extrinsicsCount,
                    eventsCount,
                    time: getBlockTime(signedBlock.block.toHuman()),
                    hash,
                  })
                );
                dispatch(setCurrentBlockNumber(blockNumber));
              })
              .catch(console.error);
          })
          .catch(console.error);
      });
      return unsubscribeAll;
    };
    getBlocks();

    return () => unsubscribeAll && unsubscribeAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
