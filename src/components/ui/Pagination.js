import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalResults, label = 'results' }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 1rem' }}>
      <div style={{ fontSize: '13px', color: 'var(--muted)', fontWeight: 600 }}>
        {totalResults !== undefined && `Showing ${totalResults} ${label}`}
      </div>
      
      {totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1}
            className={`btn btn-secondary`}
            style={{ padding: '6px 12px', fontSize: '12px', opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'default' : 'pointer' }}
          >
            Prev
          </button>

          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--muted)', margin: '0 8px' }}>
            Page {currentPage} of {totalPages}
          </div>

          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className={`btn btn-secondary`}
            style={{ padding: '6px 12px', fontSize: '12px', opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'default' : 'pointer' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
