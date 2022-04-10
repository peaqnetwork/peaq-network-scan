export default function InfoPlaceholder({ text, isListContainer }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center bordered-content-box"
      style={{ height: isListContainer ? "800px" : "400px" }}
    >
      <p className="text-white">{text}</p>
    </div>
  );
}
