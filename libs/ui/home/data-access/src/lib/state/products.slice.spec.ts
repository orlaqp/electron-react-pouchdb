import {
  fetchStateproducts,
  stateproductsAdapter,
  stateproductsReducer,
} from './state/products.slice';

describe('stateproducts reducer', () => {
  it('should handle initial state', () => {
    const expected = stateproductsAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(stateproductsReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchStateproductss', () => {
    let state = stateproductsReducer(
      undefined,
      fetchStateproducts.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = stateproductsReducer(
      state,
      fetchStateproducts.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = stateproductsReducer(
      state,
      fetchStateproducts.rejected(new Error('Uh oh'), null, null)
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
