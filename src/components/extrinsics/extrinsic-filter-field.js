export default function ExtrinsicFilterField({ changeFilter, label, type }) {
  return (
    <div className="extrinsics-filter-fields">
      <span className="text-dark-white mr-3">{label}</span>
      <input type={type} className="text-dark-white" onChange={changeFilter} />
    </div>
  );
}
