import {renderWithRouter} from './test-utils';
import React from 'react';
import GaneshPage from '../pages/GaneshPage';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('GaneshPage', () => {
  it('renders without crashing', () => {
    renderWithRouter(<GaneshPage />, { route: '/ganesh' });
  });

  it('shows progress feedback while receiving a blessing', async () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})));

    renderWithRouter(<GaneshPage />, { route: '/ganesh' });
    fireEvent.change(screen.getByPlaceholderText(/Enter your wish/i), {
      target: { value: 'My wish' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Offer 🌼/i }));
    fireEvent.click(screen.getByRole('button', { name: /Offer 🌸/i }));
    fireEvent.click(screen.getByRole('button', { name: /Offer 🌺/i }));
    fireEvent.click(screen.getByRole('button', { name: /Offer 🌻/i }));
    fireEvent.click(screen.getByRole('button', { name: /Receive my blessing/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/preparing your blessing/i);
    expect(screen.getByRole('button', { name: /Receiving your blessing/i })).toBeDisabled();
  });
});


describe('GaneshPage - wish persistence tests', () => {
    it('restores the wish from sessionStorage', () => {
      window.sessionStorage.setItem('shri-ganesh-draft-wish', 'My wish');
        
        renderWithRouter(<GaneshPage />, { route: '/ganesh' });

        const wishInput = screen.getByPlaceholderText(/Enter your wish/i);
        expect(wishInput).toHaveValue('My wish');
    })
})