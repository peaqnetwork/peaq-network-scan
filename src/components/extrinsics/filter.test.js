import { render } from "@testing-library/react";
import App from "../../App";
import ExtrinsicsFilter from "./filter";

test("renders ExtrinsicsFilter component without errors", () => {
  render(
    <App>
      <ExtrinsicsFilter />
    </App>
  );
});
