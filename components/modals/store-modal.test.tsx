import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreModal } from './store-modal';
import create from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Mock Zustand Store
jest.mock('../../hooks/use-store-modal', () => ({
  useStoreModal: jest.fn(),
}));

// Mock Axios and Toast
jest.mock('axios');
jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn(),
  },
}));

const mockUseStoreModal = require('../../hooks/use-store-modal').useStoreModal;
const mockAxiosPost = axios.post as jest.Mock;

describe('StoreModal Component', () => {
  beforeEach(() => {
    mockUseStoreModal.mockReturnValue(
      create(() => ({
        isOpen: true,
        onClose: jest.fn(),
      }))
    );
    jest.clearAllMocks();
  });

  it('renders the modal when open', () => {
    render(<StoreModal />);
    expect(screen.getByText('Create Store')).toBeInTheDocument();
    expect(screen.getByText('Add a new store to manage products and categories')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Store Name Here...')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockResponse = { data: { id: 'store123' } };
    mockAxiosPost.mockResolvedValueOnce(mockResponse);
    window.location.assign = jest.fn();

    render(<StoreModal />);

    const input = screen.getByPlaceholderText('Store Name Here...');
    fireEvent.change(input, { target: { value: 'New Store' } });

    const submitButton = screen.getByText('Continue');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('/api/stores', { name: 'New Store' });
      expect(window.location.assign).toHaveBeenCalledWith('/store123');
    });
  });

  it('shows an error toast on form submission failure', async () => {
    mockAxiosPost.mockRejectedValueOnce(new Error('Failed to create store'));

    render(<StoreModal />);

    const input = screen.getByPlaceholderText('Store Name Here...');
    fireEvent.change(input, { target: { value: 'New Store' } });

    const submitButton = screen.getByText('Continue');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('closes the modal when cancel is clicked', () => {
    const mockOnClose = jest.fn();
    mockUseStoreModal.mockReturnValue(
      create(() => ({
        isOpen: true,
        onClose: mockOnClose,
      }))
    );

    render(<StoreModal />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
