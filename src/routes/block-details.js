import { useParams } from "react-router-dom";
import BlockData from "../components/block-details/block-data/block-data";
import BlockSnapshot from "../components/block-details/block-snapshot";
import BlockTitleSwitch from "../components/block-details/block-title-switch";

export default function BlockDetails() {
  const { blockNumber } = useParams();

  return (
    <div className="page">
      <BlockTitleSwitch blockNumber={blockNumber} />
      <BlockSnapshot blockNumber={blockNumber} />
      <BlockData blockNumber={blockNumber} />
    </div>
  );
}
