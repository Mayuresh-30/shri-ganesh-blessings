import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import { beforeEach, expect, it } from 'vitest';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './test-utils';

beforeEach(() => {
  window.sessionStorage.clear();
  window.localStorage.clear();
});

describe('WelcomePage - Basic Rendering Tests', () => {

  it('renders welcome message on screen', () => {
    render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    const welcomeMessage = screen.getByText(/Welcome to Shri Ganesh Blessings/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});

describe('WelcomePage - User Input Tests', () => {

    it('has a input field',() => {
        render(
            <MemoryRouter>
                <WelcomePage/>
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/Enter your name/i);

        expect(input).toBeInTheDocument();
    })


    it('allows typing in the input field', async () => {

        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <WelcomePage/>
            </MemoryRouter>
        );

        const input = screen.getByPlaceholderText(/Enter your name/);

        await user.type(input,'Mayuresh');

        expect(input).toHaveValue('Mayuresh');
    })

it('has a "Get my blessings" button', () => {
  renderWithRouter(<WelcomePage/>, { route: '/' });

  // Fill the input so the button is enabled
  fireEvent.change(screen.getByPlaceholderText(/Enter your name/i), {
    target: { value: 'Mayuresh' },
  });

  const button = screen.getByRole('button', {
    name: /Continue to Shri Ganesh/i,
  });

  expect(button).toBeInTheDocument();
});

});

  describe('WelcomePage - Data Persistence Tests', () => {


    it('restores the name from sessionStorage', () => {
      window.sessionStorage.setItem('shri-ganesh-draft-name', 'Mayuresh');

      renderWithRouter(<WelcomePage/>, { route: '/' });

      const input = screen.getByPlaceholderText(/Enter your name/i);

      expect(input).toHaveValue('Mayuresh');
    })
  
  })


// describe('WelcomePage - Buttons Interactions', () => {

   
// })