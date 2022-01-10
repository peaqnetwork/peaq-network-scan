import Blocks from "../components/blocks";
import Snapshot from "../components/snapshot";
import Validators from "../components/validators";

export default function Home() {
  return (
    <div className="page">
      <h1>Hello World</h1>
      <Snapshot />
      <Blocks />
      <Validators />
    </div>
  );
}
