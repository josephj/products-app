import styled from 'styled-components';
import { media } from './utils';

export const Grid = styled.div`
  margin: 0 -10px -10px 0;
`;
export const GridCell = styled.div`
  box-sizing: border-box;
  display: inline-block;
  padding: 0 10px 10px 0;
  ${media.huge`width: 20%`}
  ${media.desktop`width: 20%`}
  ${media.laptop`width: 25%`}
  ${media.tablet_landscape`width: 33.33333%`}
  ${media.tablet_portrait`width: 50%`}
  ${media.mobile`width: 100%`}
`;
