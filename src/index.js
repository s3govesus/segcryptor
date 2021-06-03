const { v1: uuidv1 } = require(`uuid`);
// there is no uuidv2 function
const { v3: uuidv3 } = require(`uuid`);
const { v4: uuidv4 } = require(`uuid`);
const { v5: uuidv5 } = require(`uuid`);
const crypto = require(`crypto`);

const uuidRegex = /^([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/g;

/******************************************************************************/

// generates an ID usually made up of one or more of the UUID algorithms
//
// EXAMPLE OPTIONS
// const options = {
//   version: 4, // the version of UUID or segcryptor-specific ID to generate
//   name: `segcryptor default`, // UUIDv3 or UUIDv5 specific parameter
//   namespace: `https://github.com/s3govesus/segcrpytor`, // UUIDv3 or UUIDv5 specific parameter
//   seed: `1582683512738` // version 0 / segcryptor-specific parameter of random data - uses Date.now().toString() by default
// };
module.exports.makeID = (options) => {
  let value = ``;

  // apply default settings if necessary
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        version: 4,
        name: Date.now().toString(),
        namespace: `https://github.com/s3govesus/segcryptor`,
        seed: Date.now().toString(),
      };
    } else {
      if (options.version === undefined) {
        options.version = `4`;
      } else if (typeof options.version !== `string`) {
        throw new Error(`The value for the 'version' option in makeID() must be a string.`);
      }
      if (options.name === undefined) {
        options.name = Date.now().toString();
      } else {
        options.name = options.name.toString();
      }
      if (options.namespace === undefined) {
        options.namespace = `https://github.com/s3govesus/segcryptor`;
      } else {
        options.namespace = options.namespace.toString();
      }
      if (options.seed === undefined) {
        options.seed = Date.now().toString();
      } else {
        options.seed = options.seed.toString();
      }
    }
  } catch (ex) {
    // ? TODO
    throw new Error(ex.message);
  }

  // decide what kind of ID to generate based on the options parameter and do it
  switch (options.version) {
    case `1`:
      value = makev1();
      break;
    case `3`:
      value = makev3(options);
      break;
    case `1.3`:
      value = makev13(options);
      break;
    case `3.1`:
      value = makev31(options);
      break;
    case `4`:
      value = makev4();
      break;
    case `1.4`:
      value = makev14();
      break;
    case `4.1`:
      value = makev41();
      break;
    case `5`:
      value = makev5(options);
      break;
    case `1.5`:
      value = makev15(options);
      break;
    case `5.1`:
      value = makev51(options);
      break;
    case `0`: // randomly generated 256-bit uuid of my own design, with optional seed parameter
      value = makev0(options);
      break;
    case `0.1`:
      value = makev01(options);
      break;
    case `1.0`:
      value = makev10(options);
      break;
    case `0.3`:
      value = makev03(options);
      break;
    case `3.0`:
      value = makev30(options);
      break;
    case `0.4`:
      value = makev04(options);
      break;
    case `4.0`:
      value = makev40(options);
      break;
    case `0.5`:
      value = makev05(options);
      break;
    case `5.0`:
      value = makev50(options);
      break;
    default: // v4
      value = makev4();
      break;
  }

  return value;
};
const { makeID } = this;

/******************************************************************************/

function makev1() {
  let value = ``;

  value = uuidv1();

  return value;
}

/******************************************************************************/

function makev3(options) {
  let value = ``;

  // if the namespace isn't already a valid UUID namespace, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  // and then generate the actual result value UUID using that namespace + the name
  value = uuidv3(options.name, options.namespace);

  return value;
}

/******************************************************************************/

function makev13(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv1();
  // if the namespace is already a UUID
  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  // and then generate the actual result value UUID using that namespace + the name
  part2 = uuidv3(options.name, options.namespace);
  part1 = part1.substring(0, 18);
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev31(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  part1 = uuidv3(options.name, options.namespace);
  part2 = uuidv1();
  part1 = part1.substring(0, 18);
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev4() {
  let value = ``;

  value = uuidv4();

  return value;
}

/******************************************************************************/

function makev14() {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv1();
  part2 = uuidv4();
  part1 = part1.substring(0, 18);
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev41() {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv4();
  part2 = uuidv1();
  part1 = part1.substring(0, 18);
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev5(options) {
  let value = ``;

  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv5(options.namespace, uuidv5.URL);
    } else {
      options.namespace = uuidv5(options.namespace, uuidv5.DNS);
    }
  }
  // and then generate the actual result value UUID using that namespace + the name
  value = uuidv5(options.name, options.namespace);

  return value;
}

/******************************************************************************/

function makev15(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv1();
  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv5(options.namespace, uuidv5.URL);
    } else {
      options.namespace = uuidv5(options.namespace, uuidv5.DNS);
    }
  }
  // and then generate the actual result value UUID using that namespace + the name
  part2 = uuidv5(options.name, options.namespace);
  part1 = part1.substring(0, 18);
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev51(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv5(options.namespace, uuidv5.URL);
    } else {
      options.namespace = uuidv5(options.namespace, uuidv5.DNS);
    }
  }
  part1 = uuidv5(options.name, options.namespace);
  part1 = part1.substring(0, 18);
  part2 = uuidv1();
  part2 = part2.substring(18, part2.length);
  value = part1 + part2;

  return value;
}

/******************************************************************************/

function makev0(options) {
  let value = ``;

  value = makeID256(options.seed);

  return value;
}

/******************************************************************************/

function makev01(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = makeID256(options.seed);
  part1 = part1.substring(0, 37);
  part2 = uuidv1();
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev10(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv1();
  part2 = makeID256(options.seed);
  part2 = part2.substring(36, part2.length);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev03(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = makeID256(options.seed);
  part1 = part1.substring(0, 37);
  // if the namespace isn't already a valid UUID namespace, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  part2 = uuidv3(options.name, options.namespace);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev30(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  // if the namespace isn't already a valid UUID namespace, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  part1 = uuidv3(options.name, options.namespace);
  part2 = makeID256(options.seed);
  part2 = part2.substring(36, part2.length);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev04(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = makeID256(options.seed);
  part1 = part1.substring(0, 37);
  part2 = uuidv4();
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev40(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = uuidv4();
  part2 = makeID256(options.seed);
  part2 = part2.substring(36, part2.length);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev05(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  part1 = makeID256(options.seed);
  part1 = part1.substring(0, 37);
  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  part2 = uuidv5(options.name, options.namespace);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

function makev50(options) {
  let value = ``;

  let part1 = ``;
  let part2 = ``;

  // if the namespace isn't already a valid UUID, make it one
  if (uuidRegex.test(options.namespace) === false) {
    if (options.namespace.indexOf(`://`) >= 0) {
      options.namespace = uuidv3(options.namespace, uuidv3.URL);
    } else {
      options.namespace = uuidv3(options.namespace, uuidv3.DNS);
    }
  }
  part1 = uuidv5(options.name, options.namespace);
  part2 = makeID256(options.seed);
  part2 = part2.substring(36, part2.length);
  value = `${part1}${part2}`;

  return value;
}

/******************************************************************************/

// generates a 256-bit ID instead of a 128-bit UUID, with an optional seed
// const resultEx = `d5820238-c6a7-11e9-aa8c-2a2ae2dbcce4-d5820238-c6a7-11e9-aa8c-2a2ae2dbcce4`
function makeID256(seed) {
  let result = ``;

  // generate a SHA-512 hash of the current unix timestamp
  let hash = Date.now().toString();
  hash = hashValue(hash, { count: 1 });

  if (seed === undefined) {
    seed = Date.now().toString();
  }
  seed = hashValue(seed, { count: 1 });

  hash = saltHash(hash, seed);
  hash = hashValue(hash, { count: 3 });

  // take the first 8 characters of the 128-character cryptographic hash
  result += hash.substring(0, 8);
  hash = hash.substring(8, hash.length);

  // generate 4 random hexidecimal characters (2x 16-bit values)
  let rand1 = ``;
  for (let i = 0; i < 2; i += 1) {
    const rando = Math.floor(Math.random() * 256);
    let randoString = rando.toString(16);
    if (randoString.length === 1) {
      randoString = `0${randoString}`;
    }
    rand1 += randoString;
  }
  result += `-${rand1}`;

  // take the next 4 characters from the cryptographic hash
  result += `-${hash.substring(0, 4)}`;
  hash = hash.substring(4, hash.length);

  // generate 4 random hexidecimal characters (2x 16-bit values)
  let rand2 = ``;
  for (let i = 0; i < 2; i += 1) {
    const rando = Math.floor(Math.random() * 256);
    let randoString = rando.toString(16);
    if (randoString.length === 1) {
      randoString = `0${randoString}`;
    }
    rand2 += randoString;
  }
  result += `-${rand2}`;

  // take the next 12 characters from the cryptographic hash
  result += `-${hash.substring(0, 12)}`;
  hash = hash.substring(12, hash.length);

  // generate 8 random hexidecimal characters (4x 16-bit values)
  let rand3 = ``;
  for (let i = 0; i < 4; i += 1) {
    const rando = Math.floor(Math.random() * 256);
    let randoString = rando.toString(16);
    if (randoString.length === 1) {
      randoString = `0${randoString}`;
    }
    rand3 += randoString;
  }
  result += `-${rand3}`;

  // take the next 4 characters from the cryptographic hash
  result += `-${hash.substring(0, 4)}`;
  hash = hash.substring(4, hash.length);

  // generate 4 random hexidecimal characters (2x 16-bit values)
  let rand4 = ``;
  for (let i = 0; i < 2; i += 1) {
    const rando = Math.floor(Math.random() * 256);
    let randoString = rando.toString(16);
    if (randoString.length === 1) {
      randoString = `0${randoString}`;
    }
    rand4 += randoString;
  }
  result += `-${rand4}`;

  // take the next 4 characters from the cryptographic hash
  result += `-${hash.substring(0, 4)}`;
  hash = hash.substring(4, hash.length);

  // generate 12 random hexidecimal characters (6x 16-bit values)
  let rand5 = ``;
  for (let i = 0; i < 6; i += 1) {
    const rando = Math.floor(Math.random() * 256);
    let randoString = rando.toString(16);
    if (randoString.length === 1) {
      randoString = `0${randoString}`;
    }
    rand5 += randoString;
  }
  result += `-${rand5}`;

  return result;
}

/******************************************************************************/

// makes a random hexadecimal hash
//
// EXAMPLE OPTIONS
// const options = {
//   size: 64, // how many bytes of hexadecimal data to generate - 512 bits = 64 bytes
//   isSecure: false,
// };
// NOTE size is in BYTES : 1 BYTE = 8 BITS = 2 HEX Characters
// string length = size * 2
module.exports.makeHash = (options) => {
  // get the options or fill with defaults
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        size: 64,
        isSecure: false,
      };
    } else {
      if (options.size === undefined) {
        options.size = 64;
      } else {
        options.size = Number(options.size);
      }
      if (options.isSecure === undefined) {
        options.isSecure = false;
      } else {
        options.isSecure = this.toBoolean(options.isSecure);
      }
    }
  } catch (ex) {
    // ? TODO
    throw new Error(
      `An exception error occurred while attempting to parse the options for the hash generation function : ${ex.message}`,
    );
  }

  let numString = ``;

  if (options.isSecure === true) {
    const numStringArr = new Array(options.size);
    let allBytesFilled = false;
    do {
      // figure out which byte/iteration to generate
      const currentByte = Math.floor(Math.random() * options.size);
      if (numStringArr[currentByte] === undefined) {
        // generate a random byte and assign it to the current iteration
        const currentNum = Math.floor(Math.random() * 256);
        numStringArr[currentByte] = currentNum.toString(16);
      }
      // check if all the bytes are filled
      for (let i = 0; i < numStringArr.length; i += 1) {
        if (numStringArr[i] === undefined) {
          allBytesFilled = false;
          break;
        } else {
          allBytesFilled = true;
        }
      }
    } while (allBytesFilled === false);
    // build the string using each byte in the array
    for (let i = 0; i < numStringArr.length; i += 1) {
      if (numStringArr[i].length === 1) {
        numStringArr[i] = `0${numStringArr[i]}`;
      }
      numString += numStringArr[i];
    }
  } else {
    for (let i = 0; i < options.size; i += 1) {
      const currentNum = Math.floor(Math.random() * 256);
      let currentNumString = currentNum.toString(16);
      if (currentNumString.length === 1) {
        currentNumString = `0${currentNumString}`;
      }
      numString += currentNumString;
    }
  }

  return numString;
};
const { makeHash } = this;

/******************************************************************************/

// TODO add the complex mode from makeHash to this function
// makes a randomized alphanumeric key string
//
// EXAMPLE OPTIONS
// const options = {
//   size: 20, // must be an integer greater than 0
//   isComplex: false // whether to generate a case-sensitive key with both uppercase and lowercase characters (isComplex:true) or a key with only lowercase characters (isComplex:false)
//   TODO add an option called 'hyphenInterval' which adds a hyphen after a specific number of characters
//   TODO add an option called 'hyphenCount' which is sort of like 'hyphenInterval', but instead attempts to evenly space out the characters around a certain total number of hyphens to place in the string
//   TODO add a 'toUpperCase' option that will capitalize all the letters (assuming 'isComplex' was also false)
// }
module.exports.makeKey = (options) => {
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        size: 20,
        isComplex: false,
      };
    } else {
      if (options.size === undefined) {
        options.size = 20;
      } else {
        options.size = Number(options.size);
      }
      if (options.isComplex === undefined) {
        options.isComplex = false;
      } else {
        options.isComplex = this.toBoolean(options.isComplex);
      }
    }
    if (options.size % 1 !== 0 || options.size < 1) {
      // error, size must be an integer greater than or equal to 1
      throw new Error(
        `The size options for the key generation function was not an integer (whole number) greater than or equal to 1.`,
      );
    }
  } catch (ex) {
    throw new Error(
      `An exception error occurred while attempting to parse the options for the key generation function : ${ex.message}`,
    );
  }

  let upperRange = 36;
  if (options.isComplex === true) {
    upperRange = 62;
  } else {
    upperRange = 36;
  }
  let result = ``;
  const characters = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
  for (let i = 0; i < options.size; i += 1) {
    const rando = Math.floor(Math.random() * upperRange);
    result += characters[rando];
  }
  return result;
};
const { makeKey } = this;

/******************************************************************************/

// applies salt to a password and then runs the SHA-512 algorithm on it a number of times, determined by `options.count`
//
// EXAMPLE OPTIONS
// const exOptions = {
//   count: 3
// };
module.exports.encryptPassword = (hash, salt, options) => {
  let value = ``;

  // fill in any blanks in the options parameter if necessary
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        count: 3,
      };
    } else if (options.count === undefined) {
      options.count = 3;
    } else {
      options.count = Number(options.count);
    }
  } catch (ex) {
    // ? TODO
    throw new Error(
      `An exception error occurred while attempting to parse the options for the password encryption function : ${ex.message}`,
    );
  }

  value = this.saltHash(hash, salt);
  value = this.hashValue(value, options);

  return value;
};
const { encryptPassword } = this;

/******************************************************************************/

// applies salt to a hash, then applies the SHA-512 algorithm to it
module.exports.saltHash = (hash, salt) => {
  let value = ``;

  // if the hash and string are the same length, interleave the two
  let longer = 0;
  if (hash.length > salt.length) {
    longer = hash.length;
  } else {
    longer = salt.length;
  }
  for (let i = 0; i < longer; i += 1) {
    if (i < hash.length) {
      value += hash[i];
    }
    if (i < salt.length) {
      value += salt[i];
    }
  }

  return value;
};
const { saltHash } = this;

/******************************************************************************/

// encrypts a string using the 'aes-256-cbc' algorithm
// key and iv can be hexadecimal strings or a byte array
// returns a hexadecimal string
module.exports.encrypt = (str, key, iv) => {
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
};
const { encrypt } = this;

/******************************************************************************/

// decrypts a string that's been encrypted using the 'aes-256-cbc' algorithm
module.exports.decrypt = (data, key, iv) => {
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
};
const { decrypt } = this;

/******************************************************************************/

// takes a string and applies a SHA-512 encryption hashing algorithm to it multiple times (to help prevent certain types of attacks)
//
// EXAMPLE OPTIONS
// exOptions = {
//   count: 1,
// };
module.exports.hashValue = (str, options) => {
  let value = str;

  if (options === undefined) {
    options = {
      count: 1,
      type: `sha512`,
    };
  } else {
    if (options.count === undefined) {
      options.count = 1;
    } else {
      options.count = Number(options.count);
    }
    if (options.type === undefined) {
      options.type = `sha512`;
    } else {
      options.type = String(options.type);
    }
  }

  for (let i = 0; i < options.count; i += 1) {
    value = crypto.createHash(options.type).update(value).digest(`hex`);//sha512Hex(value);
  }

  return value;
};
const { hashValue } = this;

/******************************************************************************/

// converts a string or numeric value to a boolean true or false
module.exports.toBoolean = (value) => {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (value === `true` || value === `yes` || value === `y` || value === `1`) {
      return true;
    }
    return false;
  }
  if (typeof value === `boolean`) {
    return value;
  }
  throw new Error(
    `Error attempting to parse ${JSON.stringify(value)} as a boolean value.`,
  );
};
const { toBoolean } = this;

/******************************************************************************/

// takes a string of hexadecimal characters and converts them to plain-text latin1 encoded characters
module.exports.hexToLatin = (hexStr) => {
  let result;

  result = hexStr.split(/(\w\w)/g)
    .filter((p) => !!p)
    .map((c) => String.fromCharCode(parseInt(c, 16)))
    .join(``);

  return result;
};
const { hexToLatin } = this;

/******************************************************************************/

// takes a string of characters in plaintext and converts them to a hexadecimal string
module.exports.latinToHex = (plainStr) => {
  let result;

  result = plainStr.split(``)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, `0`))
    .join(``);

  return result;
};
const { latinToHex } = this;

/******************************************************************************/

// a wrapper for crypto.randomBytes, as this will commonly be used with encrypt() and decrypt()
module.exports.randomBytes = (size) => crypto.randomBytes(size);
const { randomBytes } = this;
