import React from 'react';
export default ({ onChange, value, ...otherProps }) => {
  const sizes = [4, 8, 12, 24, 48, 96, 198];
  return (
    <select value={value} onChange={onChange} {...otherProps}>
      {sizes.map((size, i) => (
        <option key={i} value={size}>
          {size} per page
        </option>
      ))}
    </select>
  );
};
