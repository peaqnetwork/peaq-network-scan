import { render } from "@testing-library/react";
import BlockTitleSwitch from "./block-title-switch";
import App from "../../App";

const dummyBlockNumber = "12345";

test("renders BlockTitleSwitch component without errors", () => {
  render(
    <App>
      <BlockTitleSwitch blockNumber={dummyBlockNumber} />
    </App>
  );
});
