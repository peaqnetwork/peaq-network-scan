import { render } from "@testing-library/react";
import BlockSnapshot from "./block-snapshot";

const dummyBlock = { blockNumber: "12345", isFinalized: true };

test("renders BlockSnapshot component without errors", () => {
  render(<BlockSnapshot block={dummyBlock} />);
});
