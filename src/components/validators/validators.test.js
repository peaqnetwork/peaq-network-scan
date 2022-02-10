import { render } from "@testing-library/react";
import Validators from "./validators";
import App from "../../App";

test("renders Validators component without errors", () => {
  render(
    <App>
      <Validators />
    </App>
  );
});
