import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { setLatestBlocks } from "../store/slices/latest-blocks-slice";
import { setCurrentBlockNumber } from "../store/slices/current-block-number-slice";
import { Link } from "react-router-dom";
import { useSubstrateState } from "../libs/substrate";
import config from "../config";
import ExtrinsicsHistory from "../components/extrinsics/history";
import ExtrinsicsFilter from "../components/extrinsics/filter";
import ExtrinsicsList from "../components/extrinsics/list";

export default function Extrinsics() {
  const { api } = useSubstrateState();

  const [extrinsics, setExtrinsics] = useState([]);

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

          extrinsicsList.push(signedBlock.toHuman().block.extrinsics);
          count++;
          blockNumber = blockNumber - 1;
        }
        setExtrinsics(extrinsicsList);
      } catch (err) {
        console.error(err);
      }
    };

    getExtrinsics();
  }, []);

  return (
    <div className="page">
      <ExtrinsicsHistory extrinsics={extrinsics} />
      <ExtrinsicsFilter />
      <ExtrinsicsList />
    </div>
  );
}
