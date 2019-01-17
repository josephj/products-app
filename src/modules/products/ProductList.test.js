import React from 'react';
import ProductList from './ProductList';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ProductList />);
});
