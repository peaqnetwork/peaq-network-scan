export default function Dropdown({ options }) {
  return (
    <div className="filter-dropdown-content">
      {options.map((o) => (
        <span onClick={o.onClick} key={Math.random()}>
          {o.option}
        </span>
      ))}
    </div>
  );
}
