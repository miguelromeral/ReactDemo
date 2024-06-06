import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import '@testing-library/jest-dom/extend-expect';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  const label = "Search";
  const placeholder = "Type something...";
  const onChange = jest.fn();

  beforeEach(() => {
    onChange.mockClear();
  });

  test('renders with the correct label and placeholder', () => {
    render(<SearchForm label={label} placeholder={placeholder} onChange={onChange} />);
    
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  test('updates the query state on input change', () => {
    render(<SearchForm label={label} placeholder={placeholder} onChange={onChange} />);

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(input.value).toBe('test query');
  });

  test('calls onChange prop on input change', () => {
    render(<SearchForm label={label} placeholder={placeholder} onChange={onChange} />);

    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'test query' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('test query');
  });
});
