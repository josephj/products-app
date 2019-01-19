import { mount, shallow } from 'enzyme';
import React from 'react';
import { ProductList } from './ProductList';
import Item from './Item';
import { PageLimit } from '../../components';

describe('<ProductList/>', () => {
  it('always renders a div', () => {
    expect(shallow(<ProductList />).type()).toEqual('div');
  });
  it('renders content loader', () => {
    const wrapper = shallow(<ProductList data={[]} isLoading />);
    expect(wrapper.html('svg')).toEqual('<svg>product-list-loader.svg</svg>');
  });
  it('renders total number of products', () => {
    const wrapper = shallow(<ProductList total={3} isLoading={false} />);
    expect(wrapper.find('Info').text()).toEqual('3 Products');
  });
  it('renders <Item/> components', () => {
    const data = [{}, {}, {}];
    const wrapper = shallow(<ProductList data={data} isLoading={false} />);
    expect(wrapper.find(Item)).toHaveLength(3);
  });
  //============
  // Page Limit
  //============
  it('renders limit select', () => {
    const data = [{}];
    const wrapper = mount(<ProductList data={data} limit={8} total={1} />);
    expect(wrapper.find(PageLimit)).toBeTruthy();
    expect(wrapper.find(PageLimit).props().value).toEqual(8);
    wrapper.setProps({ limit: 48 });
    expect(wrapper.find(PageLimit).props().value).toEqual(48);
  });
  it('triggers onLimitChange', () => {
    const onLimitChange = jest.fn();
    const data = [{}];
    const wrapper = mount(
      <ProductList
        data={data}
        limit={8}
        total={1}
        onLimitChange={onLimitChange}
      />
    );
    wrapper
      .find(PageLimit)
      .find('select')
      .simulate('change', { target: { value: 24 } });
    expect(onLimitChange).toHaveBeenCalled();
  });
  //============
  // Pagination
  //============
  // TODO - Pagination part can be moved out while I implement it from scratch.
  it('renders pagination with 1 item', () => {
    const data = [{}];
    const wrapper = mount(
      <ProductList data={data} total={data.length} isLoading={false} />
    );
    const pageItems = wrapper.find('Footer li');
    expect(pageItems).toHaveLength(3);
    expect(pageItems.first().text()).toEqual('< Previous page');
    expect(pageItems.at(1).text()).toEqual('1');
    expect(pageItems.last().text()).toEqual('Next page >');
  });
  it('renders pagination with 1000 items at page #50', () => {
    const total = 1000;
    const data = Array(total).map(() => ({}));
    const wrapper = mount(
      <ProductList
        data={data}
        page={50}
        limit={8}
        total={total}
        isLoading={false}
      />
    );
    const pageItems = wrapper.find('Footer li');
    expect(pageItems).toHaveLength(5);
    expect(pageItems.first().text()).toEqual('< Previous page');
    expect(pageItems.at(1).text()).toEqual('49');
    expect(pageItems.at(2).text()).toEqual('50');
    expect(pageItems.at(3).text()).toEqual('51');
    expect(pageItems.last().text()).toEqual('Next page >');
  });
  it('triggers onChangeChange', () => {
    const total = 50;
    const data = Array(total).map(() => ({}));
    const onPageChange = jest.fn();
    const wrapper = mount(
      <ProductList
        data={data}
        page={2}
        total={total}
        isLoading={false}
        onPageChange={onPageChange}
      />
    );
    wrapper
      .find('Footer li')
      .at(1) // first page
      .simulate('click');
    expect(onPageChange).toHaveBeenCalled();
    expect(onPageChange).toBeCalledWith(1);
  });
});
