// App.test.js
import { render, screen } from '@testing-library/react';
import PlayZone from './PlayZone';

test('renders Play Zone title', () => {
  render(<PlayZone />);
  const titleElement = screen.getByText(/The Play Zone/i);
  expect(titleElement).toBeInTheDocument();
});

