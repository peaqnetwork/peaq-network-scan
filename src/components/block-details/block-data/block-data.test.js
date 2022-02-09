import { render } from "@testing-library/react";
import BlockData from "./block-data";
import App from "../../../App";

test("renders BlockData component without errors", () => {
  render(
    <App>
      <BlockData />
    </App>
  );
});
