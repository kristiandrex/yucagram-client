export function mapReverse(array, callback) {
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  const A = new Array(array.length);

  let element, value;
  let i = array.length - 1;
  let j = 0;

  while (i >= 0) {
    element = array[i];
    value = callback(element, j);

    A[j] = value;
    i--;
    j++;
  }

  return A;
}

const array = {
  mapReverse
};

export default array;