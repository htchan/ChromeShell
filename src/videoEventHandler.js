var listeners = {};
var wrappers = {};

function addEventListener(element, event, callback, options = {}) {
  if (!element) return;

  let elementListeners = listeners[element] || {};
  elementListeners[event] == null
    ? (elementListeners[event] = [callback])
    : elementListeners[event].push(callback);

  // store the wrapper so it can be removed later
  let wrapper = () => {
    elementListeners[event].forEach((registeredCallback) => {
      registeredCallback(element);
    });
  };

  let elementWrappers = wrappers[element] || {};
  elementWrappers[event] = wrapper;
  wrappers[element] = elementWrappers;

  element.addEventListener(event, wrapper, options);

  listeners[element] = elementListeners;
}

function removeEventListener(element, event, callback) {
  if (!element) return;
  let elementListeners = listeners[element] || {};
  elementListeners[event] = (elementListeners[event] || []).filter(
    (registeredCallback) => registeredCallback != callback
  );

  // remove the old wrapper and attach a new one with the updated list
  let elementWrappers = wrappers[element] || {};
  if (elementWrappers[event]) {
    element.removeEventListener(event, elementWrappers[event]);
  }

  if (elementListeners[event].length > 0) {
    let wrapper = () => {
      elementListeners[event].forEach((registeredCallback) => {
        registeredCallback(element);
      });
    };
    elementWrappers[event] = wrapper;
    element.addEventListener(event, wrapper);
  } else {
    delete elementWrappers[event];
  }

  wrappers[element] = elementWrappers;
  listeners[element] = elementListeners;
}
