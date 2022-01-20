export const get = (item) => JSON.parse(localStorage.getItem(item));

export const isInLs = (item) => localStorage.getItem(item);

export const set = (item, value) =>
	localStorage.setItem(item, JSON.stringify(value));

export const remove = (item) => localStorage.removeItem(item);
