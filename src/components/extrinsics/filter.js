import { useState } from "react";

export default function ExtrinsicsFilter({
  params,
  changeFilterParams,
  filterExtrinsics,
}) {
  const [isModuleDropdownOpen, setIsModuleDropdownOpen] = useState(false);
  const [isTimeDimensionDropdownOpen, setIsTimeDimensionDropdownOpen] =
    useState(false);

  const toggleModuleDropdown = () =>
    setIsModuleDropdownOpen(!isModuleDropdownOpen);
  const toggleTimeDimensionDropdown = () =>
    setIsTimeDimensionDropdownOpen(!isTimeDimensionDropdownOpen);

  const changeFilter = (param, value) => {
    changeFilterParams(param, value);
    param === "module" && toggleModuleDropdown();
    param === "timeDimension" && toggleTimeDimensionDropdown();
  };

  return (
    <div className="mt-40 mb-40 extrinsics-filter">
      <div className="mb-40">
        <div
          className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields"
          onClick={toggleModuleDropdown}
        >
          <span className="text-dark-white">Module ({params.module})</span>{" "}
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
          {isModuleDropdownOpen && (
            <div className="filter-dropdown-content">
              <span onClick={() => changeFilter("module", "all")}>All</span>
              <span onClick={() => changeFilter("module", "dynamicFee")}>
                Dynamic Fee
              </span>
              <span onClick={() => changeFilter("module", "timestamp")}>
                Timestamp
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-space-between align-items-center">
        <div
          className="d-flex justify-content-space-between align-items-center extrinsics-filter-fields"
          onClick={toggleTimeDimensionDropdown}
        >
          <span className="text-dark-white">
            Time dimension ({params.timeDimension})
          </span>{" "}
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
          {isTimeDimensionDropdownOpen && (
            <div className="filter-dropdown-content">
              <span onClick={() => changeFilter("timeDimension", "date")}>
                Date
              </span>
              <span onClick={() => changeFilter("timeDimension", "block")}>
                Block
              </span>
            </div>
          )}
        </div>
        {params.timeDimension === "date" && (
          <>
            <div className="extrinsics-filter-fields d-flex justify-content-space-between align-items-center">
              <span className="text-dark-white mr-3">Start</span>
              <input
                type="date"
                className="text-dark-white"
                onChange={(e) => changeFilter("startDate", e.target.value)}
              />
            </div>
            <div className="extrinsics-filter-fields d-flex justify-content-space-between align-items-center">
              <span className="text-dark-white">End</span>
              <input
                type="date"
                className="text-dark-white"
                onChange={(e) => changeFilter("endDate", e.target.value)}
              />
            </div>
          </>
        )}
        {params.timeDimension === "block" && (
          <>
            <div className="extrinsics-filter-fields">
              <input
                placeholder="Start block"
                type="text"
                onChange={(e) => changeFilter("startBlock", e.target.value)}
                className="text-dark-white"
              />
            </div>
            <div className="extrinsics-filter-fields">
              <input
                placeholder="End block"
                type="text"
                onChange={(e) => changeFilter("endBlock", e.target.value)}
                className="text-dark-white"
              />
            </div>
          </>
        )}
        <div>
          <span className="button" onClick={() => filterExtrinsics()}>
            Filter
          </span>
        </div>
      </div>
    </div>
  );
}
