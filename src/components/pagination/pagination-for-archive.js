export default function PaginationForArchive({ pageNumber, setPageNumber }) {
  const gotoNextPage = () => setPageNumber((pageNumber) => pageNumber + 1);
  const gotoPrevPage = () =>
    pageNumber < 2 ? null : setPageNumber((pageNumber) => pageNumber - 1);
  return (
    <div className="mt-20 mb-20 d-flex align-items-center">
      <span className="mr-3 pointer" onClick={gotoPrevPage}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.4102 7.42L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6L15.4102 7.42Z"
            fill="#979798"
          />
        </svg>
      </span>
      <span className="text-accent-purple mr-3 pagination-number-selected d-flex align-items-center justify-content-center">
        <span>{pageNumber}</span>
      </span>

      <span className="pointer" onClick={gotoNextPage}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.58984 16.58L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.58Z"
            fill="#979798"
          />
        </svg>
      </span>
    </div>
  );
}
