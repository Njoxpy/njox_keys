import React from 'react';

const Pagination = ({ currentPage, totalCount, perPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / perPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="text-center mt-4">
      <p className="text-sm text-slate-600 mb-2">
        Showing {(currentPage - 1) * perPage + 1} to{' '}
        {Math.min(currentPage * perPage, totalCount)} of {totalCount} results
      </p>
      <div className="inline-flex items-center gap-2 text-slate-800">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2"
        >
          &lt;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-1 rounded-full ${
              page === currentPage ? 'bg-blue-100 text-blue-600' : ''
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
