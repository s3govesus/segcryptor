const { toBoolean } = require(`./lib/misc`);
const { makeID } = require(`./lib/id`);
const {
  encryptPassword, saltHash, hashValue, makeHash, makeKey,
} = require(`./lib/hash`);
const crypto = require(`crypto`);

/******************************************************************************/

// encrypts a string using the 'aes-256-cbc' algorithm
// key and iv should be hexadecimal strings or a byte array
// iv is the initialization vector - this should be a random value
// key should be 32 hex characters?
// iv should be 16 hex characters?
// returns a hexadecimal string
function encrypt(str, key, iv) {
  // convert key as necessary
  let key2 = key;
  if (typeof key2 === `string`) {
    key2 = Buffer.from(key2, `hex`);
  }
  // convert iv as necessary
  let iv2 = iv;
  if (typeof iv2 === `string`) {
    iv2 = Buffer.from(iv2, `hex`);
  }

  // creating cipheriv with its parameter
  const cipher = crypto.createCipheriv(`aes-256-cbc`, Buffer.from(key2), iv2);

  // updating text
  let encrypted = cipher.update(str);

  // using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // returning iv and encrypted data
  return encrypted.toString(`hex`);
}

/******************************************************************************/

// decrypts a string that's been encrypted using the 'aes-256-cbc' algorithm
function decrypt(data, key, iv) {
  // if key is a hexadecimal string, convert it to a byte array buffer
  let key2 = key;
  if (typeof key2 === `string`) {
    key2 = Buffer.from(key2, `hex`);
  }
  // if iv is a hexadecimal string, convert it to a byte array buffer
  let iv2 = iv;
  if (typeof iv2 === `string`) {
    iv2 = Buffer.from(iv2, `hex`);
  }
  // convert the encrypted data to a byte array buffer
  const encryptedText = Buffer.from(data, `hex`);

  // create a decipher
  const decipher = crypto.createDecipheriv(
    `aes-256-cbc`, Buffer.from(key2), iv2,
  );

  // updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}

/******************************************************************************/

// takes a string of hexadecimal characters and converts them to plain-text latin1 encoded characters
// function hexToLatin(hexStr) {
//   let result;

//   result = hexStr.split(/(\w\w)/g)
//     .filter((p) => !!p)
//     .map((c) => String.fromCharCode(parseInt(c, 16)))
//     .join(``);

//   // let x = toBoolean();
//   return result;
// }
function hexToLatin(hexString) {
  let latin1String = ``;
  for (let i = 0; i < hexString.length; i += 2) {
    let hex = hexString.substr(i, 2);
    let dec = parseInt(hex, 16);
    latin1String += String.fromCharCode(dec);
  }
  return latin1String;
}

/******************************************************************************/

// takes a string of characters in plaintext and converts them to a hexadecimal string
// function latinToHex(plainStr) {
//   let result;

//   result = plainStr.split(``)
//     .map((c) => c.charCodeAt(0).toString(16).padStart(2, `0`))
//     .join(``);

//   return result;
// }
function latinToHex(latin1String) {
  let hexString = ``;
  for (let i = 0; i < latin1String.length; i += 1) {
    let dec = latin1String.charCodeAt(i);
    let hex = dec.toString(16).padStart(2, `0`);
    hexString += hex;
  }
  return hexString;
}

/******************************************************************************/

// a wrapper for crypto.randomBytes, as this will commonly be used with encrypt() and decrypt()
function randomBytes(size) {
  return crypto.randomBytes(size);
}

/******************************************************************************/

module.exports = {
  toBoolean,
  makeID,
  encryptPassword,
  saltHash,
  encrypt,
  decrypt,
  hashValue,
  webHashValue: hashValue,
  hexToLatin,
  latinToHex,
  randomBytes,
  makeHash,
  makeKey,
};
