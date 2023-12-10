export function getElement(element) {
  const elem = document.querySelector(element);
  if (element) {
    return elem;
  }
  throw new Error("Element not found");
}
