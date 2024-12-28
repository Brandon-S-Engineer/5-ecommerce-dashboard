import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StoreModal } from './store-modal';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { act } from 'react-dom/test-utils';

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
    mockUseStoreModal.mockReturnValue({
      isOpen: true,
      onClose: jest.fn(),
    });

    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        assign: jest.fn(),
      },
    });

    jest.clearAllMocks();
  });

  it('renders the modal when open', async () => {
    await act(async () => {
      render(<StoreModal />);
    });
    expect(screen.getByText('Create Store')).toBeInTheDocument();
    expect(screen.getByText('Add a new store to manage products and categories')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Store Name Here...')).toBeInTheDocument();
  });

  it('handles form submission successfully', async () => {
    const mockResponse = { data: { id: 'store123' } };
    mockAxiosPost.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      render(<StoreModal />);
    });

    const input = screen.getByPlaceholderText('Store Name Here...');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Store' } });
    });

    const submitButton = screen.getByText('Continue');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(mockAxiosPost).toHaveBeenCalledWith('/api/stores', {
        name: 'New Store',
      });
      expect(window.location.assign).toHaveBeenCalledWith('/store123');
    });
  });

  it('shows an error toast on form submission failure', async () => {
    mockAxiosPost.mockRejectedValueOnce(new Error('Failed to create store'));

    await act(async () => {
      render(<StoreModal />);
    });

    const input = screen.getByPlaceholderText('Store Name Here...');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'New Store' } });
    });

    const submitButton = screen.getByText('Continue');
    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
  });

  it('closes the modal when cancel is clicked', async () => {
    const mockOnClose = jest.fn();
    mockUseStoreModal.mockReturnValue({
      isOpen: true,
      onClose: mockOnClose,
    });

    await act(async () => {
      render(<StoreModal />);
    });

    const cancelButton = screen.getByText('Cancel');
    await act(async () => {
      fireEvent.click(cancelButton);
    });

    expect(mockOnClose).toHaveBeenCalled();
  });
});
