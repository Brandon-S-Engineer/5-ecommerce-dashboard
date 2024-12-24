import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MainNav } from './main-nav';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ storeId: 'store123' })), // Mock useParams to return a fake storeId
  usePathname: jest.fn(() => '/store123/categories'), // Mock usePathname to simulate current path
}));

describe('MainNav Component', () => {
  it('renders all navigation links', () => {
    render(<MainNav />);

    // Check if all labels are rendered
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
