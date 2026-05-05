export const createMswRequestSpy = (events = ['request']) => {
  const deferredByEvent = {};

  const createDeferred = () => {
    let resolve;
    const promise = new Promise((res) => {
      resolve = res;
    });
    return { promise, resolve };
  };

  const ensureDeferred = (eventName) => {
    if (!deferredByEvent[eventName]) {
      deferredByEvent[eventName] = createDeferred();
    }
    return deferredByEvent[eventName];
  };

  const initialCalled = Object.fromEntries(events.map((eventName) => [eventName, false]));
  const initialData = Object.fromEntries(events.map((eventName) => [eventName, null]));

  const spy = {
    called: { ...initialCalled },
    data: { ...initialData },
    reset() {
      this.called = { ...initialCalled };
      this.data = { ...initialData };

      for (const eventName of Object.keys(deferredByEvent)) {
        delete deferredByEvent[eventName];
      }

      for (const eventName of events) {
        ensureDeferred(eventName);
      }
    },
    capture(eventName, payload) {
      this.called[eventName] = true;
      this.data[eventName] = payload;

      const deferred = ensureDeferred(eventName);
      deferred.resolve(payload);
      deferredByEvent[eventName] = null;
    },
    waitFor(eventName = events[0]) {
      const deferred = ensureDeferred(eventName);
      return deferred.promise;
    },
  };

  spy.reset();
  return spy;
};
