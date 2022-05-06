export default function Dropdown({ options, top = "200px" }) {
  return (
    <div className="filter-dropdown-content" style={{ marginTop: top }}>
      {options.map((o) => (
        <span onClick={o.onClick} key={Math.random()}>
          {o.option}
        </span>
      ))}
    </div>
  );
}
