import { render } from "@testing-library/react";
import App from "../../App";
import Events from "../../routes/events";

test("renders Events component without errors", () => {
  render(
    <App>
      <Events />
    </App>
  );
});
