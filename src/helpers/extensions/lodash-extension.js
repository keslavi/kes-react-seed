import lodashIsEmpty from 'lodash/isEmpty';

const isSingleNullishEntry = (value) => {
	if (Array.isArray(value)) {
		return value.length === 1 && (value[0] === null || value[0] === undefined);
	}

	const keys = Object.keys(value);
	return keys.length === 1 && (value[keys[0]] === null || value[keys[0]] === undefined);
};

const isEmptyInternal = (value, seen, depth = 0) => {
	if (value === null || value === undefined) {
		return true;
	}

	if (typeof value === 'string') {
		return value.trim() === '';
	}

	if (
		typeof value === 'number' ||
		typeof value === 'boolean' ||
		typeof value === 'function' ||
		typeof value === 'symbol' ||
		typeof value === 'bigint'
	) {
		return false;
	}

	if (value instanceof Date || value instanceof RegExp) {
		return false;
	}

	if (Array.isArray(value)) {
		if (value.length === 0) {
			return true;
		}

		if (depth === 0 && isSingleNullishEntry(value)) {
			return false;
		}

		if (seen.has(value)) {
			return false;
		}

		seen.add(value);
		return value.every((item) => isEmptyInternal(item, seen, depth + 1));
	}

	if (typeof value === 'object') {
		const keys = Object.keys(value);
		if (keys.length === 0) {
			return true;
		}

		if (depth === 0 && isSingleNullishEntry(value)) {
			return false;
		}

		if (seen.has(value)) {
			return false;
		}

		seen.add(value);
		return keys.every((key) => isEmptyInternal(value[key], seen, depth + 1));
	}

	return lodashIsEmpty(value);
};

export const isEmpty = (value, legacyBehavior = false) => {
	if (legacyBehavior) {
		return lodashIsEmpty(value);
	}

	return isEmptyInternal(value, new WeakSet());
};

globalThis.isEmpty = isEmpty;

export default isEmpty;


