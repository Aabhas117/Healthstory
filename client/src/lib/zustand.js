import { useState, useEffect } from 'react';

export function create(createState) {
  let state;
  const listeners = new Set();

  const setState = (partial, replace) => {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state = replace ? nextState : Object.assign({}, state, nextState);
      listeners.forEach((listener) => listener(state, previousState));
    }
  };

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => {
    listeners.clear();
  };

  const api = { setState, getState, subscribe, destroy };
  state = createState(setState, getState, api);

  const useBoundStore = (selector = (s) => s) => {
    const [slice, setSlice] = useState(() => selector(state));

    useEffect(() => {
      const listener = () => {
        const nextSlice = selector(state);
        setSlice(nextSlice);
      };
      const unsubscribe = subscribe(listener);
      return () => unsubscribe();
    }, [selector]);

    return slice;
  };

  Object.assign(useBoundStore, api);
  return useBoundStore;
}

export default create;
