import React from 'react';

const Spinner = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-spinner">{message}</div>
  );
};

export default Spinner;
