import BlocksLatest from "./blocks-latest";
import BlocksTransfers from "./blocks-transfers";

export default function Blocks() {
  return (
    <div className="blocks-container">
      <BlocksTransfers />
      <BlocksLatest />
      <div style={{ clear: "both" }}></div>
    </div>
  );
}
