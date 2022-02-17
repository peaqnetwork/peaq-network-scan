import { render } from "@testing-library/react";
import App from "../../App";
import ExtrinsicsHistory from "./history";

test("renders ExtrinsicsHistory component without errors", () => {
  render(
    <App>
      <ExtrinsicsHistory />
    </App>
  );
});
