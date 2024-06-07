import { render, screen } from '@testing-library/react';
import App from './App';
import { act } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';

test('renders app successfully', () => {
  act(() => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );
  })
  const h1 = screen.getByText(/MiguelRomeral/i);
  expect(h1).toBeInTheDocument();
});
