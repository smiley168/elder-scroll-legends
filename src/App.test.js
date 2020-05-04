import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';

// test('renders Elder Scrolls Legends', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/elder/i);
//   expect(linkElement).toBeInTheDocument();
// });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('renders header message', () => {
  const { getByText } = render(<App />);
  expect(getByText('Learn about Elder Scrolls Legends')).toBeInTheDocument();
});