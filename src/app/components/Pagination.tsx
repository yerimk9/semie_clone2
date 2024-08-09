import Link from "next/link";
import React from "react";

function Pagination({
  currentPage,
  maxPageNumber,
}: {
  currentPage: number;
  maxPageNumber: number;
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`/cooking/list/${currentPage - 1}`} className="prev">
          <i className="icon_prev">이전페이지</i>
        </Link>
      )}
      <span className="page_p">
        {Array.from({ length: maxPageNumber }, (_, i) => (
          <Link
            key={i + 1}
            href={`/cooking/list/${i + 1}`}
            className={i + 1 === currentPage ? "act" : ""}
          >
            {i + 1}
          </Link>
        ))}
      </span>
      {currentPage < maxPageNumber && (
        <Link href={`/cooking/list/${currentPage + 1}`} className="next">
          <i className="icon_next">다음페이지</i>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
