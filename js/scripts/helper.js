export function saveToLocal(itemToSave, name) {
  localStorage.setItem(`${name}`, JSON.stringify(itemToSave));
}
