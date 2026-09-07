import {renderWithRouter} from './test-utils';
import React from 'react';
import GaneshPage from '../pages/GaneshPage';
import { beforeEach, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});

describe('GaneshPage', () => {
  it('renders without crashing', () => {
    renderWithRouter(<GaneshPage />, { route: '/ganesh' });
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