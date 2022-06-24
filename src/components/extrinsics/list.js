import { Link } from "react-router-dom";
import { copyText } from "../../utils";
import FormatedTime from "../formated-time";
import InfoPlaceholder from "../info-placeholder";
import Pagination from "../pagination/pagination";
import { useEffect, useState } from "react";
import config from "../../config";

export default function ExtrinsicsList({
  extrinsicsList,
  isLoadingExtrinsics
}) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [isDataFetched, setIsDataFetched] = useState(true);
  const [pageNum, setPageNum] = useState(0);

  //console.log("extrinsicsList", extrinsicsList);

  const getExtrinsics = async () => {
    // Fetch items from another resources.
    const endOffset = itemOffset + config.ITEMS_PER_PAGE;

    setCurrentItems(extrinsicsList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(extrinsicsList.length / config.ITEMS_PER_PAGE));
  }

  useEffect(() => {
    getExtrinsics();
  }, [itemOffset, config.ITEMS_PER_PAGE]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * config.ITEMS_PER_PAGE) % extrinsicsList.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    setItemOffset(newOffset);
    setPageNum(event.selected);
  };


  if (isLoadingExtrinsics) {
    return <InfoPlaceholder text="Loading extrinsics list..." />;
  }
  if (extrinsicsList.length < 1) {
    return <InfoPlaceholder text="Sorry, nothing to show here" />;
  }
  if (extrinsicsList.length > 1) {
    if (isDataFetched) {
      getExtrinsics();
      setIsDataFetched(false);
    }
  }
  return (
    <>
      <div className="extrinsics-list bordered-content-box scroll-x">
        <table className="table">
          <thead>
            <tr>
              <th className="no-wrap">Extrinsic Id</th>
              <th>Block</th>
              <th>Hash</th>
              <th>Time</th>
              {/* <th>Result</th> */}
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(
              ({
                extrinsicId,
                blockNumber,
                hash,
                time,
                isSigned,
                action,
                extrinsicJSON,
              }) => (
                <tr key={extrinsicId}>
                  <td className="text-accent-purple no-wrap">
                    <Link to={`/extrinsic/${extrinsicId}`}>{extrinsicId}</Link>
                  </td>
                  <td className="text-accent-purple">
                    <Link to={`/block/${blockNumber}`}>{blockNumber}</Link>
                  </td>

                  <td className="text-accent-purple">{hash}</td>

                  <td className="text-dark-white">
                    <FormatedTime time={new Date(time)} />
                  </td>

                  {/* <td className="">
                  {isSigned ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z"
                        fill="#24D180"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 2C13.3132 2 14.6136 2.25866 15.8268 2.7612C17.0401 3.26375 18.1425 4.00035 19.0711 4.92893C19.9997 5.85752 20.7362 6.95991 21.2388 8.17317C21.7413 9.38642 22 10.6868 22 12C22 14.6522 20.9464 17.1957 19.0711 19.0711C17.1957 20.9464 14.6522 22 12 22C6.47 22 2 17.5 2 12C2 9.34784 3.05357 6.8043 4.92893 4.92893C6.8043 3.05357 9.34784 2 12 2ZM12.5 7V12.25L17 14.92L16.25 16.15L11 13V7H12.5Z"
                        fill="#D19113"
                      />
                    </svg>
                  )}
                </td> */}

                  <td className="text-accent-purple">{action}</td>

                  <td className="no-wrap">
                    <span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 pointer"
                        onClick={() => copyText(extrinsicJSON)}
                      >
                        <path
                          d="M17.9091 19.3636H8.90909V7.90909H17.9091V19.3636ZM17.9091 6.27273H8.90909C8.4751 6.27273 8.05888 6.44513 7.75201 6.75201C7.44513 7.05888 7.27273 7.4751 7.27273 7.90909V19.3636C7.27273 19.7976 7.44513 20.2138 7.75201 20.5207C8.05888 20.8276 8.4751 21 8.90909 21H17.9091C18.3431 21 18.7593 20.8276 19.0662 20.5207C19.3731 20.2138 19.5455 19.7976 19.5455 19.3636V7.90909C19.5455 7.4751 19.3731 7.05888 19.0662 6.75201C18.7593 6.44513 18.3431 6.27273 17.9091 6.27273ZM15.4545 3H5.63636C5.20237 3 4.78616 3.1724 4.47928 3.47928C4.1724 3.78616 4 4.20237 4 4.63636V16.0909H5.63636V4.63636H15.4545V3Z"
                          fill="#979798"
                        />
                      </svg>
                    </span>
                    <span>
                      {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.5 6C7.18182 6 3.49409 8.69533 2 12.5C3.49409 16.3047 7.18182 19 11.5 19C15.8182 19 19.5059 16.3047 21 12.5C19.5059 8.69533 15.8182 6 11.5 6ZM11.5 16.8333C9.11636 16.8333 7.18182 14.892 7.18182 12.5C7.18182 10.108 9.11636 8.16667 11.5 8.16667C13.8836 8.16667 15.8182 10.108 15.8182 12.5C15.8182 14.892 13.8836 16.8333 11.5 16.8333ZM11.5 9.9C10.0664 9.9 8.90909 11.0613 8.90909 12.5C8.90909 13.9387 10.0664 15.1 11.5 15.1C12.9336 15.1 14.0909 13.9387 14.0909 12.5C14.0909 11.0613 12.9336 9.9 11.5 9.9Z"
                        fill="#979798"
                      />
                    </svg> */}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end">
        <div></div> {/* Downloads component  */}
        <Pagination
          pageCount={pageCount}
          pageOffset={pageNum}
          handleChangePage={handlePageClick}
        />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
}
