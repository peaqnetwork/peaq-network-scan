import ExtrinsicsData from "./extrinsics-data";

export default function BlockData() {
  return (
    <div className="block-data">
      <div className="block-data-tabs">
        <span className="block-data-title block-data-tab active text-dark-white">
          Extrinsics <span className="badge ml-3">5</span>
        </span>
        <span className="block-data-title block-data-tab text-dark-white">
          Events <span className="badge ml-3">34</span>
        </span>
        <span className="block-data-title block-data-tab text-dark-white">
          Log <span className="badge ml-3">34</span>
        </span>
      </div>
      {/* <hr /> */}
      <ExtrinsicsData />
    </div>
  );
}
