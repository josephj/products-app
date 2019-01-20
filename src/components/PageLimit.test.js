import React from 'React';
import { shallow } from 'enzyme';
import PageLimit from './PageLimit';

describe('<PageLimit/>', () => {
  it('renders <select/>', () => {
    const wrapper = shallow(<PageLimit />);
    expect(wrapper.find('Select')).toHaveLength(1);
  });
  it('renders multiple <option/>', () => {
    const wrapper = shallow(<PageLimit />);
    expect(wrapper.find('option').length).toBeGreaterThan(1);
  });
  it('selects an option', () => {
    const wrapper = shallow(<PageLimit value={48} />);
    expect(wrapper.find('Select').getElement().props.value).toEqual(48);
  });
  it('triggers onChange', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<PageLimit onChange={onChange} />);
    wrapper.find('Select').simulate('change', { target: { value: 24 } });
    expect(onChange).toHaveBeenCalledWith(24);
  });
});
