import { OLD_KEYS_MAX } from "./config.js";

export const state = {
  key: "",
  keyLength: 22,
  characterSet: {
    alphabet: true,
    numbers: true,
    symbols: true,
  },
  oldKeys: [],
};

/**
 * Create an array of allowable characters
 *
 * Return: array of allowable characters
 */
const getAllowedCharacters = function () {
  const allowedChars = [];
  if (state.characterSet.alphabet)
    "abcdefghijklmnopqrstuvwxyz"
      .split("")
      .forEach(
        (char) =>
          allowedChars.push(char) && allowedChars.push(char.toUpperCase()),
      );
  if (state.characterSet.numbers)
    "1234567890".split("").forEach((num) => allowedChars.push(num));
  if (state.characterSet.symbols)
    "!@#$%^&*()[]{}/|".split("").forEach((char) => allowedChars.push(char));
  return allowedChars;
};

/**
 * Get a uniformly distributed random integer in [0, n) from the browser's CSPRNG
 *
 * Rejection sampling discards values above the largest multiple of n so the
 * modulo does not favour lower indices.
 */
const randomIndex = function (n) {
  const limit = Math.floor(2 ** 32 / n) * n;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % n;
};

/**
 * Generate random string based on state.characterset
 */
export const randomString = function (keyParameters) {
  const { keyLength, ...characterSet } = keyParameters;
  // 1. Set length and allowable characters in state
  state.keyLength = +keyLength;
  state.characterSet = characterSet;
  // 2. Get allowable character array
  const allowedChars = getAllowedCharacters();

  // No character set selected: there is nothing to build a key from
  if (allowedChars.length === 0) {
    state.key = "";
    return;
  }

  // 3. Generate random key with character set
  const randomKey = [];
  const charSetLength = allowedChars.length;
  for (let i = 0; i < state.keyLength; i++) {
    randomKey.push(allowedChars[randomIndex(charSetLength)]);
  }

  // 4. Set the current state key
  state.key = randomKey.join("");
};

/**
 *  Update oldKeys Array with current key
 *
 *  Return: NULL
 */
export const updateOldKeyArray = function () {
  if (!state.key) return;
  state.oldKeys.push(state.key);

  if (state.oldKeys.length > OLD_KEYS_MAX) state.oldKeys.shift();
};
