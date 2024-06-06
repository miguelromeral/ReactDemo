import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app successfully', () => {
  render(<App />);
  const h1 = screen.getByText(/MiguelRomeral/i);
  expect(h1).toBeInTheDocument();
});
