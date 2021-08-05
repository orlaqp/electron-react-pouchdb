import {
  fetchStatecategories,
  statecategoriesAdapter,
  statecategoriesReducer,
} from './state/categories.slice';

describe('statecategories reducer', () => {
  it('should handle initial state', () => {
    const expected = statecategoriesAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(statecategoriesReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStatecategoriess', () => {
    let state = statecategoriesReducer(
      undefined,
      fetchStatecategories.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = statecategoriesReducer(
      state,
      fetchStatecategories.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = statecategoriesReducer(
      state,
      fetchStatecategories.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
