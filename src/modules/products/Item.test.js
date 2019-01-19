import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Item from './Item';

describe('<Item/>', () => {
  it('renders a div', () => {
    const wrapper = shallow(<Item data={{}} />);
    expect(wrapper.type().target).toEqual('div');
  });
  it('renders a broken icon ', () => {
    const wrapper = shallow(<Item data={{}} />);
    expect(wrapper.find('Img').html()).toMatch('cloud-offline.svg');
  });
  it('renders a loading icon', () => {
    const wrapper = shallow(<Item data={{ product_image: 'foo.png' }} />);
    expect(wrapper.find('Img').html()).toMatch('spinner.svg');
  });
  it('renders a image', () => {
    const wrapper = mount(
      <Item data={{ product_image: 'foo.png', product_name: 'Foo' }} />
    );
    let img = wrapper.find('Img');
    img.instance().setState({ isLoading: false, isLoaded: true });
    wrapper.update();
    img = wrapper.find('Img');
    const props = img.find('img').props();
    expect(props.src).toEqual('foo.png');
    expect(props.alt).toEqual('Image of Foo');
  });
  it('renders product name', () => {
    const wrapper = shallow(<Item data={{ product_name: 'Foo' }} />);
    expect(wrapper.find('Name').text()).toEqual('Foo');
  });
  it('renders description', () => {
    const wrapper = shallow(<Item data={{ description: 'This is Foo' }} />);
    expect(wrapper.find('Desc').text()).toEqual('This is Foo');
  });
  it('renders price', () => {
    const wrapper = shallow(<Item data={{ price: 'A$100' }} />);
    expect(wrapper.find('Price').text()).toEqual('A$100');
  });
});
