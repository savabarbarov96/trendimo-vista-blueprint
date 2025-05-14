
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// Mock the router and other dependencies
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Routes: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Route: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
}));

// Mock Suspense to immediately render children
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock components that might cause issues in tests
jest.mock('@/components/ui/toast', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ToastViewport: () => null,
}));

jest.mock('@tanstack/react-query', () => ({
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  QueryClient: jest.fn(() => ({})),
}));

// Basic smoke test to ensure the app renders without crashing
describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    // If the app renders without crashing, this test passes
    expect(document.body).toBeDefined();
  });
});
