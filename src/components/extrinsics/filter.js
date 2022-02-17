export default function ExtrinsicsFilter() {
  return (
    <div className="mt-40 mb-40 d-flex justify-content-space-between align-items-center">
      <div className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields">
        <span className="text-dark-white">Time dimension</span>{" "}
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.41 0.579956L6 5.16996L10.59 0.579956L12 1.99996L6 7.99996L0 1.99996L1.41 0.579956Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
      </div>
      <div className="extrinsics-filter-fields">
        <span className="text-dark-white">Start date</span>
      </div>
      <div className="extrinsics-filter-fields">
        <span className="text-dark-white">End date</span>
      </div>
      <div>
        <span className="button">Filter</span>
      </div>
    </div>
  );
}
