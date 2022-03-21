export default function InfoPlaceholder({ text }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center bordered-content-box"
      style={{ height: "400px" }}
    >
      <p className="text-white">{text}</p>
    </div>
  );
}
