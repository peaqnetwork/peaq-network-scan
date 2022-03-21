import { useParams } from "react-router-dom";
import TitleSwitch from "../components/title-switch/title-switch";

export default function ExtrinsicDetails() {
  const { extrinsicId } = useParams();

  return (
    <div className="page">
      <TitleSwitch
        titleName="Extrinsic"
        titleNumber={extrinsicId}
        switchFor="extrinsic"
      />
    </div>
  );
}
