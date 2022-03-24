import { useNavigate, useParams } from "react-router-dom";
import ExtrinsicSnapshot from "../components/extrinsics/extrinsic-snapshot";
import TitleSwitch from "../components/title-switch/title-switch";

export default function ExtrinsicDetails() {
  const { extrinsicId } = useParams();
  const navigate = useNavigate();

  const blockNumber = extrinsicId.split("-")[0];
  const extrinsicIndex = Number(extrinsicId.split("-")[1]);

  const nextUrl = `/extrinsic/${blockNumber}-${extrinsicIndex + 1}`;
  const prevUrl =
    extrinsicIndex < 1
      ? null
      : `/extrinsic/${blockNumber}-${extrinsicIndex - 1}`;

  const goToNext = () => navigate(nextUrl);
  const goToPrev = () => {
    navigate(prevUrl);
  };

  return (
    <div className="page">
      <TitleSwitch
        titleName="Extrinsic"
        titleNumber={extrinsicId}
        switchFor="extrinsic"
        goToNextItem={goToNext}
        goToPrevItem={goToPrev}
        nextParam={nextUrl}
        prevParam={prevUrl}
      />
      <ExtrinsicSnapshot extrinsicId={extrinsicId} />
    </div>
  );
}
