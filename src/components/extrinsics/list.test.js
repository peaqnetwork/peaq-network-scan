import { render } from "@testing-library/react";
import App from "../../App";
import ExtrinsicsList from "./list";

test("renders ExtrinsicsList component without errors", () => {
  render(
    <App>
      <ExtrinsicsList />
    </App>
  );
});
