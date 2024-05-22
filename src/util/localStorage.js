export function localStorageSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function localStorageGet(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export function localStorageRemove(key) {
  localStorage.removeItem(key);
}
export function sessionStorageSet(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function sessionStorageGet(key) {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

export function sessionStorageRemove(key) {
  sessionStorage.removeItem(key);
}
