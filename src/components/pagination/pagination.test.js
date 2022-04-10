import { render } from "@testing-library/react";
import App from "../../App";
import Pagination from "./pagination";

test("renders Pagination component without errors", () => {
  render(
    <App>
      <Pagination />
    </App>
  );
});
