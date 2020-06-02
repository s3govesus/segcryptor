const { sha512Hex } = require(`./sha`);
const uuidv1 = require(`uuid/v1`);
// there is no uuidv2 function
const uuidv3 = require(`uuid/v3`);
const uuidv4 = require(`uuid/v4`);
const uuidv5 = require(`uuid/v5`);

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

  const uuidRegex = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}){1}/;

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
        options.version = 4;
      } else {
        options.version = Number(options.version);
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
  let part1 = ``;
  let part2 = ``;
  switch (options.version) {
    case 1:
      value = uuidv1();
      break;
    case 3:
      // if the namespace isn't already a valid UUID, make it one
      if (uuidRegex.test(options.namespace) === false) {
        if (options.namespace.indexOf(`://`) >= 0) {
          options.namespace = uuidv3(options.namespace, uuidv3.URL);
        } else {
          options.namespace = uuidv3(options.namespace, uuidv3.DNS);
        }
      }
      // and then generate the actual result value UUID using that namespace + the name
      value = uuidv3(options.name, options.namespace);
      break;
    case 1.3:
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
      break;
    case 3.1:
      // if the namespace is already a UUID
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
      break;
    case 4:
      value = uuidv4();
      break;
    case 1.4:
      part1 = uuidv1();
      part2 = uuidv4();
      part1 = part1.substring(0, 18);
      part2 = part2.substring(18, part2.length);
      value = part1 + part2;
      break;
    case 4.1:
      part1 = uuidv4();
      part2 = uuidv1();
      part1 = part1.substring(0, 18);
      part2 = part2.substring(18, part2.length);
      value = part1 + part2;
      break;
    case 5:
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
      break;
    case 1.5:
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
      break;
    case 5.1:
      // if the namespace isn't already a valid UUID, make it one
      if (uuidRegex.test(options.namespace) === false) {
        if (options.namespace.indexOf(`://`) >= 0) {
          options.namespace = uuidv5(options.namespace, uuidv5.URL);
        } else {
          options.namespace = uuidv5(options.namespace, uuidv5.DNS);
        }
      }
      part1 = uuidv5(options.name, options.namespace);
      part2 = uuidv1();
      part2 = part2.substring(18, part2.length);
      value = part1 + part2;
      break;
    case 0: // randomly generated 256-bit uuid of my own design, with optional seed parameter
      value = makeID256(options.seed);
      break;
    default: // 1.4
      part1 = uuidv1();
      part2 = uuidv4();
      part1 = part1.substring(0, 8);
      part2 = part2.substring(8, part2.length);
      value = part1 + part2;
      break;
  }

  return value;
};

/******************************************************************************/

// generates a 256-bit ID instead of a 128-bit UUID, with an optional seed
// const resultEx = `d5820238-c6a7-11e9-aa8c-2a2ae2dbcce4-d5820238-c6a7-11e9-aa8c-2a2ae2dbcce4`
function makeID256(seed) {
  let result = ``;

  // generate a SHA-512 hash of the current unix timestamp
  let hash = Date.now().toString();
  hash = this.hashString(hash, 1);

  if (seed === undefined) {
    seed = Date.now().toString();
  }
  seed = this.hashString(seed, 1);

  hash = this.saltHash(hash, seed);
  hash = this.hashString(hash, 3);

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

/******************************************************************************/

// applies salt to a password and then encrypts it
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
  value = this.hashString(value, options.count);

  return value;
};

/******************************************************************************/

// applies salt to a hash, then applies the SHA-512 algorithm to it
module.exports.saltHash = (hash, salt) => {
  let value = ``;

  // if the hash and string are the same length, interleave the two
  if (hash.length === salt.length) {
    for (let i = 0; i < hash.length; i += 1) {
      value += hash.charAt(i) + salt.charAt(i);
    }
  } else { // otherwise, simply concatenate the strings
    value = hash + salt + hash + salt + hash;
  }
  // hash the string using the SHA-512 algorithm
  value = this.hashString(value);

  return value;
};

/******************************************************************************/

// takes a string and applies a SHA-512 encryption hashing algorithm to it multiple times (to help prevent certain types of attacks)
module.exports.hashString = (str, count) => {
  let value = str;

  if (count === undefined) {
    count = 1;
  }
  for (let i = 0; i < count; i += 1) {
    value = sha512Hex(value);
  }

  return value;
};

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
