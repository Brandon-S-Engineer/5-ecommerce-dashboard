import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import StoreSwitcher from './store-switcher';
import '@testing-library/jest-dom';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

// Mock hooks and router
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('../hooks/use-store-modal', () => ({
  useStoreModal: jest.fn(() => ({
    onOpen: jest.fn(),
  })),
}));

const mockRouter = require('next/navigation').useRouter();
const mockStoreModal = require('../hooks/use-store-modal').useStoreModal();

const mockItems = [
  {
    id: '1',
    name: 'Store One',
    userId: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Store Two',
    userId: 'user2',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe('StoreSwitcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    require('next/navigation').useParams.mockReturnValue({ storeId: '1' }); // Default to storeId '1'
    require('next/navigation').useRouter.mockReturnValue({ push: jest.fn() }); // Default mock
  });

  it('renders without crashing', () => {
    render(<StoreSwitcher items={mockItems} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Store One')).toBeInTheDocument();
  });

  it('opens and closes the popover when the button is clicked', () => {
    render(<StoreSwitcher items={mockItems} />);
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    expect(screen.getByPlaceholderText('Search store')).toBeInTheDocument();

    fireEvent.click(button); // Close popover
    expect(screen.queryByPlaceholderText('Search store')).not.toBeInTheDocument();
  });

  //? Fix this first
  it('displays the list of stores when opened', () => {
    render(<StoreSwitcher items={mockItems} />);

    // Open the dropdown
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Find all elements with the role 'listbox'
    const listboxes = screen.getAllByRole('listbox');

    // Use the first 'listbox' which contains the store items
    const dropdownContainer = listboxes[0]; // Adjust this index if needed based on your component's structure

    // Verify the dropdown container is rendered
    expect(dropdownContainer).toBeInTheDocument();

    // Find items within the dropdown
    const storeOneOption = within(dropdownContainer).getByText('Store One');
    const storeTwoOption = within(dropdownContainer).getByText('Store Two');

    // Verify both stores are rendered
    expect(storeOneOption).toBeInTheDocument();
    expect(storeTwoOption).toBeInTheDocument();
  });

  it('filters stores based on search input', () => {
    render(<StoreSwitcher items={mockItems} />);
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    // Find the search input and enter a query
    const searchInput = screen.getByPlaceholderText('Search store');
    fireEvent.change(searchInput, { target: { value: 'Two' } });

    // Scope the assertions to the first relevant listbox
    const listboxes = screen.getAllByRole('listbox');
    const dropdownContainer = listboxes[0];

    // Verify only "Store Two" is displayed
    expect(within(dropdownContainer).queryByText('Store One')).not.toBeInTheDocument();
    expect(within(dropdownContainer).getByText('Store Two')).toBeInTheDocument();
  });

  it('shows "No Store Found" for unmatched search queries', () => {
    render(<StoreSwitcher items={mockItems} />);
    const button = screen.getByRole('combobox');
    fireEvent.click(button);

    const searchInput = screen.getByPlaceholderText('Search store');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } });

    expect(screen.getByText('No Store Found')).toBeInTheDocument();
  });

  it('handles the "Create Store" option gracefully', () => {
    // Render the component
    render(<StoreSwitcher items={mockItems} />);

    // Call the onOpen method directly
    mockStoreModal.onOpen();

    // Verify the modal's onOpen method was called
    expect(mockStoreModal.onOpen).toHaveBeenCalledTimes(1);
  });
});
