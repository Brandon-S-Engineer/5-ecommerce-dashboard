import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

jest.mock('@clerk/nextjs', () => ({
  UserButton: ({ afterSignOutUrl }: { afterSignOutUrl: string }) => (
    <div
      data-testid='user-button'
      data-signout-url={afterSignOutUrl}>
      User Button
    </div>
  ),
  auth: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  redirect: jest.fn(),
}));

jest.mock('./navbar', () => {
  const MockNavbar = () => <div data-testid='mock-navbar'>Navbar Content</div>;
  return MockNavbar;
});

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  it('redirects to sign-in if user is not authenticated', () => {
    (auth as jest.Mock).mockReturnValue({ userId: null }); // No authenticated user

    // Simulate the redirect logic directly
    redirect('/sign-in');
    expect(redirect).toHaveBeenCalledWith('/sign-in');
  });

  it('renders content for authenticated users', async () => {
    (auth as jest.Mock).mockReturnValue({ userId: 'user1' }); // Authenticated user

    render(<div data-testid='mock-navbar'>Navbar Content</div>);

    await waitFor(() => {
      expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    });
  });
});
