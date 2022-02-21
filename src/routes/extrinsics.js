import React, { useEffect, useState } from "react";
import { useSubstrateState } from "../libs/substrate";
import config from "../config";
import ExtrinsicsHistory from "../components/extrinsics/history";
import ExtrinsicsFilter from "../components/extrinsics/filter";
import ExtrinsicsList from "../components/extrinsics/list";

export default function Extrinsics() {
  const { api } = useSubstrateState();

  const [extrinsicsList, setExtrinsicsList] = useState([]);

  useEffect(() => {
    const getExtrinsics = async () => {
      try {
        const lastHeader = await api.rpc.chain.getHeader();

        let blockNumber = lastHeader.number.toNumber();
        const limit = config.ITEMS_PER_PAGE;
        let extrinsicsList = [];
        let count = 0;
        while (count < limit) {
          const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
          const signedBlock = await api.rpc.chain.getBlock(blockHash);
          const block = signedBlock.toHuman().block;
          extrinsicsList.push({
            blockNumber,
            extrinsics: block.extrinsics,
            epoch: Number(
              block.extrinsics[0].method.args.now.replace(/,/g, "")
            ),
          });
          count++;
          blockNumber = blockNumber - 1;
        }
        setExtrinsicsList(extrinsicsList);
      } catch (err) {
        console.error(err);
      }
    };

    getExtrinsics();
  }, [api.rpc.chain]);

  return (
    <div className="page">
      <ExtrinsicsHistory extrinsicsList={extrinsicsList} />
      <ExtrinsicsFilter />
      <ExtrinsicsList extrinsicsList={extrinsicsList} />
    </div>
  );
}
