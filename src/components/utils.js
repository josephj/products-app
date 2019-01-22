import { css } from 'styled-components';

export const breakpoints = {
  mobile: 575,
  tablet_portrait: 720,
  tablet_landscape: 940,
  laptop: 1280,
  desktop: 1440
};

export const media = Object.keys(breakpoints).reduce((accumulator, label) => {
  // Ref - https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[label] / 16;
  accumulator[label] = (...args) =>
    css`
      @media (max-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
  return accumulator;
}, {});
