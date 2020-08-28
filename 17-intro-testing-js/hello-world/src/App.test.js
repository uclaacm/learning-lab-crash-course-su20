import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe('<App />', () => {
  it('renders learn react link', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.exists('.App-link')).toBe(true);
  });

  it('should react when clicked', () => {
    let i = 0;
    const fn = () => i++;
    const wrapper = shallow(<App onClick={fn} />);
    wrapper.find('button').simulate('click');
    expect(i).toBe(1);
  });
});