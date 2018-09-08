export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function capitalize(text) {
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
}
