import Link from "next/link";
import React from "react";

function Pagination({
  currentPage,
  maxPageNumber,
  path,
}: {
  currentPage: number;
  maxPageNumber: number;
  path: string;
}) {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`${path}${currentPage - 1}`} className="prev">
          <i className="icon_prev">이전페이지</i>
        </Link>
      )}
      <span className="page_p">
        {Array.from({ length: maxPageNumber }, (_, i) => (
          <Link
            key={i + 1}
            href={`${path}${i + 1}`}
            className={i + 1 === currentPage ? "act" : ""}
          >
            {i + 1}
          </Link>
        ))}
      </span>
      {currentPage < maxPageNumber && (
        <Link href={`${path}${currentPage + 1}`} className="next">
          <i className="icon_next">다음페이지</i>
        </Link>
      )}
    </div>
  );
}

export default Pagination;
