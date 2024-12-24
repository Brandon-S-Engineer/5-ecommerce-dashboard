import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainNav } from './main-nav';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
}));

const mockUseParams = require('next/navigation').useParams;
const mockUsePathname = require('next/navigation').usePathname;

describe('MainNav Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseParams.mockReturnValue({ storeId: 'store123' }); // Provide a valid storeId
    mockUsePathname.mockReturnValue('/store123/categories'); // Mock the current path
  });

  it('renders all navigation links', () => {
    render(<MainNav />);

    const labels = ['Overview', 'Billboards', 'Categories', 'Sizes', 'Colors', 'Products', 'Orders', 'Settings'];

    labels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('applies active styles to the current route', () => {
    render(<MainNav />);

    const activeLink = screen.getByText('Categories');
    expect(activeLink).toHaveClass('text-black dark:text-white');
  });

  it('does not apply active styles to non-current routes', () => {
    render(<MainNav />);

    const nonActiveLink = screen.getByText('Overview');
    expect(nonActiveLink).toHaveClass('text-muted-foreground');
  });
});
