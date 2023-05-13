var listeners = {};

function addEventListener(element, event, callback, options={}) {
  let elementListeners = listeners[element] || {};
  elementListeners[event] == null
    ? (elementListeners[event] = [callback])
    : elementListeners[event].push(callback);

  element.addEventListener(event, () => {
    elementListeners[event].forEach((item) => {
      item(element);
    });
  }, options);

  listeners[element] = elementListeners;
}

function removeEventListener(element, event, callback) {
  let elementListeners = listeners[element] || {};
  elementListeners[event] = (elementListeners[event] || []).filter(
    (item) => item != callback
  );

  element.addEventListener(event, () => {
    elementListeners[event].forEach((item) => {
      item(element);
    });
  });

  listeners[element] = elementListeners;
}
