import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlockData from "../components/block-details/block-data/block-data";
import BlockSnapshot from "../components/block-details/block-snapshot";
import TitleSwitch from "../components/title-switch/title-switch";
import { useSubstrateState } from "../libs/substrate";

export default function BlockDetails() {
  let { blockNumber } = useParams();
  blockNumber = Number(blockNumber);
  const navigate = useNavigate();

  const [blockExists, setBlockExists] = useState(true);
  const [block, setBlock] = useState(null);

  const nextUrl = `/block/${blockNumber + 1}`;
  const prevUrl = blockNumber < 1 ? null : `/block/${blockNumber - 1}`;

  const goToNext = () => navigate(nextUrl);
  const goToPrev = () => {
    navigate(prevUrl);
  };

  const { api } = useSubstrateState();

  useEffect(() => {
    const getBlock = async () => {
      try {
        const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
        const signedBlock = await api.rpc.chain.getBlock(blockHash);

        const blockObj = signedBlock.toHuman();
        // Add block hash
        blockObj.hash = blockHash.toHex();

        const bestNumberFinalized =
          await api.derive.chain.bestNumberFinalized();

        // Determine if block if finalized by comparing against chain length
        blockObj.isFinalized =
          Number(blockNumber) < bestNumberFinalized.toNumber();

        blockObj.time = Number(
          blockObj.block.extrinsics[0].method.args.now.replace(/,/g, "")
        );
        setBlockExists(true);
        setBlock(blockObj);
      } catch (err) {
        console.error(err);
        setBlock(null);
        setBlockExists(false);
      }
    };

    getBlock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return (
    <div className="page">
      <TitleSwitch
        titleName="Block"
        titleNumber={blockNumber}
        goToNextItem={goToNext}
        goToPrevItem={goToPrev}
        prevParam={prevUrl}
      />
      <BlockSnapshot
        blockNumber={blockNumber}
        block={block}
        blockExists={blockExists}
      />
      {blockExists && (
        <BlockData blockNumber={blockNumber} blockExists={blockExists} />
      )}
    </div>
  );
}
