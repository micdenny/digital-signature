import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders digital signature header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /Digital Signature/i });
  expect(headerElement).toBeInTheDocument();
});

test('renders clear button', () => {
  render(<App />);
  const clearButton = screen.getByText(/Clear/i);
  expect(clearButton).toBeInTheDocument();
});

test('renders save button', () => {
  render(<App />);
  const saveButton = screen.getByText(/Save Signature/i);
  expect(saveButton).toBeInTheDocument();
});
