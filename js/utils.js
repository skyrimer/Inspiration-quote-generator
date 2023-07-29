export const qs = (selector, searchElement = document) => {
  return searchElement.querySelector(selector);
};

export const qsa = (selector, searchElement = document) => {
  return searchElement.querySelectorAll(selector);
};
