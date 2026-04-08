import React from 'react';

const MetricCard = React.memo(({ label, value, delta, deltaColor = 'var(--mint)', colorClass = '' }) => {
  return (
    <div className={`metric ${colorClass}`}>
      <div className="mlabel">{label}</div>
      <div className="mval">{value}</div>
      {delta && <div className="mdelta" style={{ color: deltaColor }}>{delta}</div>}
    </div>
  );
});

export default MetricCard;
