// Extend Jest with custom matchers for DOM nodes
import '@testing-library/jest-dom';

// Mock the `fetch` API globally for all tests
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

jest.mock('@clerk/nextjs', () => ({
  UserButton: ({ afterSignOutUrl }) => (
    <div
      data-testid='user-button'
      data-signout-url={afterSignOutUrl}>
      User Button
    </div>
  ),
  auth: jest.fn(),
}));

jest.mock('./lib/prismadb', () => ({
  store: {
    findMany: jest.fn(),
  },
}));

// Example: Mock browser APIs like `window.alert`
beforeAll(() => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
});

// Clear all mocks and timers before each test
beforeEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});

// Restore real timers after tests complete
afterAll(() => {
  jest.useRealTimers();
});

//? Mock environment variables, Ask GPT to implement this in case there is a .env fc
process.env.NEXT_PUBLIC_API_URL = 'https://mock-api.com';
process.env.NEXT_PUBLIC_FEATURE_FLAG = 'true';
