import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSubstrateState } from "../../../libs/substrate";
import EventsData from "./events-data";
import ExtrinsicsData from "./extrinsics-data";
import LogData from "./log-data";

export default function BlockData({ blockNumber }) {
  const { api } = useSubstrateState();

  const latestBlocks = useSelector((state) => state.latestBlocks.value);

  const [block, setBlock] = useState(null);
  const [activeTab, setActiveTab] = useState("extrinsics"); // extrinsics, events, log
  const [events, setEvents] = useState([]);

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

        // Get events
        const allRecords = await api.query.system.events.at(blockHash);
        blockObj.block.extrinsics.forEach(
          ({ method: { method, section } }, index) => {
            // filter the specific events based on the phase and then the
            // index of our extrinsic in the block
            const allEvents = allRecords.filter(
              ({ phase }) =>
                phase.isApplyExtrinsic && phase.asApplyExtrinsic.eq(index)
            );
            // .map(({ event }) => `${event.section}.${event.method}`);
            setEvents(allEvents);
          }
        );
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
      {activeTab === "extrinsics" && <ExtrinsicsData block={block} />}
      {activeTab === "log" && <LogData block={block} />}
      {activeTab === "events" && (
        <EventsData blockNumber={blockNumber} events={events} />
      )}
    </div>
  );
}
