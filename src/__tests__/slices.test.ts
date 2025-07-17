import errorReducer, { setError } from '@/slices/error';
import statusReducer, { setStatus } from '@/slices/status';
import todayEventsReducer, { eventsAdded } from '@/slices/this-day';

const dummyData = {
  selected: [
    {
      text: 'Description of event 1',
      pages: {
        normalizedtitle: 'event 1',
        content_urls: {
          desktop: {
            page: 'https://event-1-link.com',
          },
        },
      },
      year: 2015,
    }
  ],
};

describe('testing slices', () => {
  it('should update error state when setError is dispatched', () => {
    const initialState = null;
    const action = setError(new Error('Network error'));
    const state = errorReducer(initialState, action);
    expect( state ).toBe('Network error');
  });

  it('should update status state when setStatus is dispatched', () => {
    const initialState = 'loaded';
    const action = setStatus('loading');
    const state = statusReducer(initialState, action);
    expect( state ).toBe('loading');
  });

  it('should update status state when setError is dispatched', () => {
    const initialState = {};
    const action = eventsAdded(dummyData);
    const state = todayEventsReducer(initialState, action);
    expect( state ).toStrictEqual(dummyData);
  });
});