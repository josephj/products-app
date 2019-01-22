import React from 'react';
import { shallow } from 'enzyme';
import Pager, { getVisiblePages } from './Pager';

describe('<Pager/>', () => {
  describe('#getVisiblePages', () => {
    it('returns sliced array', () => {
      expect(getVisiblePages(1, 10, 3)).toEqual([1, 2, 3]);
      expect(getVisiblePages(2, 10, 3)).toEqual([1, 2, 3]);
      expect(getVisiblePages(3, 10, 3)).toEqual([2, 3, 4]);
      expect(getVisiblePages(4, 10, 3)).toEqual([3, 4, 5]);
      expect(getVisiblePages(5, 10, 3)).toEqual([4, 5, 6]);
      expect(getVisiblePages(1, 10, 4)).toEqual([1, 2, 3, 4]);
      expect(getVisiblePages(2, 10, 4)).toEqual([1, 2, 3, 4]);
      expect(getVisiblePages(3, 10, 4)).toEqual([1, 2, 3, 4]);
      expect(getVisiblePages(4, 10, 4)).toEqual([2, 3, 4, 5]);
      expect(getVisiblePages(1, 10, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getVisiblePages(2, 10, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getVisiblePages(3, 10, 5)).toEqual([1, 2, 3, 4, 5]);
      expect(getVisiblePages(4, 10, 5)).toEqual([2, 3, 4, 5, 6]);
      expect(getVisiblePages(5, 10, 5)).toEqual([3, 4, 5, 6, 7]);
      expect(getVisiblePages(6, 10, 5)).toEqual([6, 7, 8, 9, 10]);
      expect(getVisiblePages(7, 10, 5)).toEqual([6, 7, 8, 9, 10]);
      expect(getVisiblePages(8, 10, 5)).toEqual([6, 7, 8, 9, 10]);
      expect(getVisiblePages(9, 10, 5)).toEqual([6, 7, 8, 9, 10]);
      expect(getVisiblePages(10, 10, 5)).toEqual([6, 7, 8, 9, 10]);
    });
  });
  describe('Component', () => {
    it('renders nothing while no page', () => {
      const wrapper = shallow(<Pager total={0} />);
      expect(wrapper.html()).toBe(null);
    });
    it('renders links', () => {
      const wrapper = shallow(<Pager total={24} range={8} page={1} />);
      const items = wrapper.find('Item');
      expect(items).toHaveLength(5);
      expect(items.first().text()).toEqual('< Previous page');
      expect(
        items
          .first()
          .find('Link')
          .type().target
      ).toEqual('a');
      expect(items.at(1).text()).toEqual('1');
      expect(items.at(2).text()).toEqual('2');
      expect(items.at(3).text()).toEqual('3');
      expect(items.last().text()).toEqual('Next page >');
      expect(
        items
          .last()
          .find('Link')
          .type().target
      ).toBe('a');
    });
    it('triggers onChange', () => {
      const onChange = jest.fn();
      const wrapper = shallow(
        <Pager page={1} total={50} onChange={onChange} />
      );
      const links = wrapper.find('Link');

      links.at(0).simulate('click', { preventDefault() {} });
      expect(onChange).not.toBeCalled();

      links.at(1).simulate('click', { preventDefault() {} });
      expect(onChange).not.toBeCalled();

      links.at(2).simulate('click', { preventDefault() {} });
      expect(onChange).toBeCalled();

      links.at(3).simulate('click', { preventDefault() {} });
      expect(onChange).toBeCalled();
    });
  });
});
