import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "../../../libs/substrate";
import ExtrinsicsData from "./extrinsics-data";

export default function BlockData({ blockNumber }) {
  const { api } = useSubstrateState();

  const latestBlocks = useSelector((state) => state.latestBlocks.value);

  const [block, setBlock] = useState(null);
  const [activeTab, setActiveTab] = useState("extrinsics"); // extrinsics, events, log

  useEffect(() => {
    const getBlock = async () => {
      try {
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);
        const blockObj = signedBlock.toHuman();

        // Grab reference block details from store to get timestamp
        const recordedBlock = latestBlocks.find(
          (block) => String(block.blockNumber) === blockNumber
        );
        blockObj.time = recordedBlock?.time;
        setBlock(blockObj);
        // setExtrinsics(blockObj.extrinsics);
      } catch (err) {
        console.error(err);
      }
    };

    getBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);
  return (
    <div className="block-data">
      <div className="block-data-tabs">
        <span
          className={`block-data-title block-data-tab ${
            activeTab === "extrinsics" ? "active" : ""
          } text-dark-white`}
          onClick={() => setActiveTab("extrinsics")}
        >
          Extrinsics{" "}
          <span className="badge ml-3">{block?.block.extrinsics.length}</span>
        </span>
        <span
          className={`block-data-title block-data-tab ${
            activeTab === "events" ? "active" : ""
          } text-dark-white`}
          onClick={() => setActiveTab("events")}
        >
          Events <span className="badge ml-3">34</span>
        </span>
        <span
          className={`block-data-title block-data-tab ${
            activeTab === "log" ? "active" : ""
          } text-dark-white`}
          onClick={() => setActiveTab("log")}
        >
          Log <span className="badge ml-3">34</span>
        </span>
      </div>

      {activeTab === "extrinsics" && <ExtrinsicsData block={block} />}
    </div>
  );
}
