export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function capitalize(text) {
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
}

export function getBaseUrl() {
  const { BASE_URL } = process.env;
  if (BASE_URL.substring(BASE_URL.length - 1) === '/') {
    return BASE_URL.substring(0, BASE_URL.length - 1);
  }
  return BASE_URL;
}

export function getSettings() {
  const settingsString = localStorage.getItem('settings');
  if (!settingsString) {
    return {};
  }
  return JSON.parse(settingsString);
}

export function saveSettings(settings) {
  const settingsString = JSON.stringify(settings);
  localStorage.setItem('settings', settingsString);
}
