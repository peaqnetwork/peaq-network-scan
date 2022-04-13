import ReactPaginate from "react-paginate";

export default function Pagination({
  handleChangePage,
  pageCount,
  pageOffset,
}) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handleChangePage}
      pageRangeDisplayed={4}
      pageCount={pageCount}
      previousLabel="<"
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="pagination-item number"
      previousClassName="pagination-item caret"
      nextClassName="pagination-item caret"
      breakClassName="pagination-item"
      marginPagesDisplayed={1}
      activeClassName="pagination-item number active"
      forcePage={pageOffset}
    />
  );
}
