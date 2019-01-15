import range from 'lodash.range';
import React from 'react';
export default ({ total, limit, value, onChange }) => {
  const count = Math.ceil(total / limit);

  return (
    <select value={value} onChange={onChange}>
      {range(count).map((page, i) => (
        <option key={i} value={page + 1}>
          Page {page + 1}
        </option>
      ))}
    </select>
  );
};
