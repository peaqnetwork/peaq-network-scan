export default function InfoPlaceholder({ text, isListContainer, isBare }) {
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${
        isBare ? "" : "bordered-content-box"
      }`}
      style={{ height: isListContainer ? "800px" : isBare ? "300px" : "400px" }}
    >
      <p className="text-white">{text}</p>
    </div>
  );
}
