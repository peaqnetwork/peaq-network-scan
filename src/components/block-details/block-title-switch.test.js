import { render } from "@testing-library/react";
import BlockTitleSwitch from "./block-title-switch";

const dummyBlockNumber = "12345";

test("renders BlockTitleSwitch component without errors", () => {
  render(<BlockTitleSwitch blockNumber={dummyBlockNumber} />);
});
