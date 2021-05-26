export function getLastIndex(array) {
  if (!Array.isArray(array)) {
    throw new Error("Must be an array.");
  }

  const len = array.length;
  return len === 0 ? 0 : len - 1;
}

export function getScroll(element) {
  if (!element) {
    return 0;
  }

  return element.scrollHeight - element.scrollTop;
}

export function scrollToEnd(element) {
  if (element === null) {
    return;
  }

  const { offsetHeight, scrollHeight } = element;
  element.scrollTop = scrollHeight - offsetHeight;
}
