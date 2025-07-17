import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';

import App from '@/App';
import statusReducer from '@/slices/status';
import errorReducer, { type Err } from '@/slices/error';
import todayEventsReducer from '@/slices/this-day';
import { ReduxProviderWrapper } from '@/utils/provider-wrappers';

const createStore = (preloadedState = {
  status: 'loaded',
  error: null as Err,
  todayEvents: {},
}) => {
  return configureStore({
    reducer: { 
      status: statusReducer,
      error: errorReducer,
      todayEvents: todayEventsReducer,
    },
    preloadedState: { ...preloadedState },
  });
};

test('testing components rendering initial state', () => {
  const store = createStore();

  render(ReduxProviderWrapper(<App />, store));
  expect(screen.getByText('Get on This Date')).toBeInTheDocument();
  expect(screen.queryByText('selected')).not.toBeInTheDocument();
  expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
});

test('testing interaction', async () => {
  const store = createStore();

  render(ReduxProviderWrapper(<App />, store));
  fireEvent.click(screen.getByText('Get on This Date'));
  expect(await screen.findByText('Loading...')).toBeInTheDocument();
  expect(screen.getByText('Get on This Date')).toBeDisabled();
});

test('testing error modal', () => {
  const store = createStore({
    status: 'error',
    error: 'Something went wrong',
    todayEvents: {},
  });

  render(ReduxProviderWrapper(<App />, store));
  expect(screen.queryByText('Something went wrong')).toBeInTheDocument();
});

test('testing list of events', () => {
  const store = createStore({
    status: 'loaded',
    error: null,
    todayEvents: {
      selected: [
        {
          text: "Example Event 1 occurred today",
          pages: [
            {
              normalizedtitle: "Example Event 1",
              content_urls: {
                desktop: {
                  page: "https://en.wikipedia.org/wiki/Example_Event_1"
                }
              }
            }
          ],
          year: 2025
        },
        {
          text: "Example Event 2 occurred today",
          pages: [
            {
              normalizedtitle: "Example Event 2",
              content_urls: {
                desktop: {
                  page: "https://en.wikipedia.org/wiki/Example_Event_2"
                }
              }
            }
          ],
          year: 2018
        },
      ],
    },
  });

  render(ReduxProviderWrapper(<App />, store));
  expect(screen.queryByText('selected')).toBeInTheDocument();
  expect(screen.queryByText(/Example Event 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/Example Event 2/i)).toBeInTheDocument();
});