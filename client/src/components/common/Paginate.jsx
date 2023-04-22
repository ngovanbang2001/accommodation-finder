import useWindowSize from "hooks/useWindowSize";
import React from "react";
import ReactPaginate from "react-paginate";

const Paginate = ({ handleTabNewClick, pageCount, pageActive }) => {
  const { width } = useWindowSize();

  return (
    <div>
      <ReactPaginate
        nextLabel=">"
        onPageChange={handleTabNewClick}
        pageRangeDisplayed={width > 480 ? 1 : 0}
        marginPagesDisplayed={width > 480 ? 1 : 0}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination mt-8 mb-2"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      <div className={"text-center text-md pt-2"}>
        Trang {pageActive}/{pageCount}
      </div>
    </div>
  );
};

export default Paginate;
