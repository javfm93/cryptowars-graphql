import { render, screen } from '@testing-library/react';
import { HomePage } from '../../../src/Pages/Home/HomePage';
import userEvent from '@testing-library/user-event';
import { MockedProvider } from '@apollo/client/testing';

describe('Home Page', () => {
  it('Should show all the towns of the player', async () => {
    const component = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <HomePage />
      </MockedProvider>
    );

    await userEvent.click(screen.getByText('Load Greeting'));
    await screen.findByRole('heading');

    // ASSERT
    expect(screen.getByRole('heading')).toBe('hello there');
  });
});
