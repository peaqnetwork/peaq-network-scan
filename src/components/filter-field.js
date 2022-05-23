import Datepicker from "react-datepicker";

export default function FilterField({
  changeFilter,
  label,
  type,
  param,
  paramName,
  minDate,
  minBlock,
  step,
}) {
  return (
    <div className="extrinsics-filter-fields">
      <span className="text-dark-white mr-3">{label}</span>
      {type === "date" ? (
        <Datepicker
          onChange={(date) => changeFilter(paramName, date)}
          placeholderText="Select date"
          selected={param}
          minDate={minDate ? minDate : null}
        />
      ) : (
        <input
          type={type}
          className="text-dark-white"
          onChange={changeFilter}
          min={minBlock ? minBlock : null}
          step={step ? step : null}
        />
      )}
    </div>
  );
}
