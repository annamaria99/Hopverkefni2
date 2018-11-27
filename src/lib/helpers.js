// eslint-disable-next-line import/prefer-default-export
export function empty(element) {
  if (element === null) return;
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
