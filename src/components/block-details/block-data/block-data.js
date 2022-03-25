import { useEffect, useState } from "react";
import { useSubstrateState } from "../../../libs/substrate";
import EventsData from "./events-data";
import ExtrinsicsData from "./extrinsics-data";
import LogData from "./log-data";

export default function BlockData({ blockNumber }) {
  const { api } = useSubstrateState();

  const [block, setBlock] = useState(null);
  const [activeTab, setActiveTab] = useState("extrinsics"); // extrinsics, events, log
  const [events, setEvents] = useState([]);
  const [signedBlock, setSignedBlock] = useState(null);

  useEffect(() => {
    const getBlock = async () => {
      try {
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);
        const blockObj = signedBlock.toHuman();

        blockObj.time = Number(
          blockObj.block.extrinsics[0].method.args.now.replace(/,/g, "")
        );
        setBlock(blockObj);
        setSignedBlock(signedBlock);

        // Get events
        const allRecords = await api.query.system.events.at(blockHash);
        setEvents(allRecords);
      } catch (err) {
        console.error(err);
      }
    };

    getBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return (
    <div className="block-data above-footer">
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
          Events <span className="badge ml-3">{events.length}</span>
        </span>
        <span
          className={`block-data-title block-data-tab ${
            activeTab === "log" ? "active" : ""
          } text-dark-white`}
          onClick={() => setActiveTab("log")}
        >
          Log{" "}
          <span className="badge ml-3">
            {block?.block.header.digest.logs.length}
          </span>
        </span>
      </div>
      {activeTab === "extrinsics" && (
        <ExtrinsicsData signedBlock={signedBlock} />
      )}
      {activeTab === "log" && <LogData signedBlock={signedBlock} />}
      {activeTab === "events" && (
        <EventsData blockNumber={blockNumber} events={events} />
      )}
    </div>
  );
}
