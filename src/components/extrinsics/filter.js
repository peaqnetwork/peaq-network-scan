import { useState } from "react";
import Dropdown from "../drop-down";
import ExtrinsicFilterField from "./extrinsic-filter-field";

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
            <Dropdown
              options={[
                { option: "All", onClick: () => changeFilter("module", "all") },
                {
                  option: "Dynamic Fee",
                  onClick: () => changeFilter("module", "dynamicFee"),
                },
                {
                  option: "Timestamp",
                  onClick: () => changeFilter("module", "timestamp"),
                },
              ]}
            />
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
            <Dropdown
              options={[
                {
                  option: "Date",
                  onClick: () => changeFilter("timeDimension", "date"),
                },
                {
                  option: "Block",
                  onClick: () => changeFilter("timeDimension", "block"),
                },
              ]}
            />
          )}
        </div>
        {params.timeDimension === "date" && (
          <>
            <ExtrinsicFilterField
              changeFilter={changeFilter}
              label="Start"
              type="date"
              paramName="startDate"
              param={params.startDate}
            />
            <ExtrinsicFilterField
              changeFilter={changeFilter}
              label="End"
              type="date"
              paramName="endDate"
              param={params.endDate}
              minDate={params.startDate}
            />
          </>
        )}
        {params.timeDimension === "block" && (
          <>
            <ExtrinsicFilterField
              changeFilter={(e) => changeFilter("startBlock", e.target.value)}
              label="Start block"
              type="text"
            />
            <ExtrinsicFilterField
              changeFilter={(e) => changeFilter("endBlock", e.target.value)}
              label="End block"
              type="text"
            />
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
