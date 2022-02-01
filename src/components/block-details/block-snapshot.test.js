import { render } from "@testing-library/react";
import BlockSnapshot from "./block-snapshot";
import App from "../../App";

const dummyBlock = { blockNumber: "12345", isFinalized: true };

test("renders BlockSnapshot component without errors", () => {
  render(
    <App>
      <BlockSnapshot block={dummyBlock} />
    </App>
  );
});
