import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <div className="page">
      <h1 className="text-dark-white">404. Not Found!</h1>
      <p className="text-dark-white">Trying to get somewhere?</p>
      <button className="button not-found-button" onClick={goBack}>
        Back to safety
      </button>
    </div>
  );
}
