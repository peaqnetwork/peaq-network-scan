import { render } from "@testing-library/react";
import App from "../../App";
import TitleSwitch from "./title-switch";

test("renders TitleSwitch component without errors", () => {
  render(
    <App>
      <TitleSwitch />
    </App>
  );
});
