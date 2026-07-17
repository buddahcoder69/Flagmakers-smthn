const STORAGE_KEY = 'credentials';

function getStorage() {
  try {
    if (window.localStorage) return window.localStorage;
  } catch (error) {
    console.warn('localStorage unavailable:', error);
  }

  try {
    if (window.sessionStorage) return window.sessionStorage;
  } catch (error) {
    console.warn('sessionStorage unavailable:', error);
  }

  return null;
}

function readStoredValue(key) {
  const storage = getStorage();
  if (storage) {
    try {
      const storedValue = storage.getItem(key);
      if (storedValue !== null) return storedValue;
    } catch (error) {
      console.warn('Could not read storage value:', error);
    }
  }

  try {
    const raw = window.name;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed[key] ?? null;
  } catch (error) {
    return null;
  }
}

function writeStoredValue(key, value) {
  let wrote = false;

  const storage = getStorage();
  if (storage) {
    try {
      storage.setItem(key, value);
      wrote = true;
    } catch (error) {
      console.warn('Could not write storage value:', error);
    }
  }

  try {
    const parsed = {};
    try {
      const raw = window.name;
      if (raw) Object.assign(parsed, JSON.parse(raw));
    } catch (error) {
      // ignore invalid existing data
    }

    parsed[key] = value;
    window.name = JSON.stringify(parsed);
    wrote = true;
  } catch (error) {
    console.warn('Could not write fallback storage:', error);
  }

  return wrote;
}

function getStoredCredentials() {
  const stored = readStoredValue(STORAGE_KEY);
  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed)) return parsed;
    if (parsed && typeof parsed === 'object') return Object.values(parsed);
  } catch (error) {
    console.warn('Could not parse credentials:', error);
  }

  return [];
}

function saveCurrentUser(user) {
  writeStoredValue('currentUser', JSON.stringify(user));
}

function showMessage(id) {
  const message = document.getElementById(id);
  if (message) message.classList.remove('hidden');
}

function hideMessage(id) {
  const message = document.getElementById(id);
  if (message) message.classList.add('hidden');
}

function initializeLogin() {
  const form = document.querySelector('.form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(form);
    const dataObject = Object.fromEntries(formData.entries());
    const username = dataObject.username?.trim();
    const password = dataObject.password;

    hideMessage('loginsuccess');
    hideMessage('invalid');
    hideMessage('noempty');

    if (!username || !password) {
      showMessage('noempty');
      return;
    }

    const creds = getStoredCredentials();
    const match = creds.find((value) => value && value.username === username && value.password === password);

    if (!match) {
      showMessage('invalid');
      return;
    }

    saveCurrentUser({
      username: match.username,
      perms: match.perms
    });
    showMessage('loginsuccess');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeLogin);
} else {
  initializeLogin();
}