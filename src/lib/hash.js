const { sha512Hex } = require(`./sha`);
const { toBoolean } = require(`./misc`);

/******************************************************************************/

// takes a string and applies a SHA-512 encryption hashing algorithm to it multiple times (to help prevent certain types of attacks)
//
// EXAMPLE OPTIONS
// exOptions = {
//   count: 1,
// };
function hashValue(str, options) {
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
    // value = crypto.createHash(options.type).update(value).digest(`hex`);
    value = sha512Hex(value);
  }

  return value;
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
function makeHash(options) {
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
        options.isSecure = toBoolean(options.isSecure);
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
}

/******************************************************************************/

// applies salt to a hash, then applies the SHA-512 algorithm to it
function saltHash(hash, salt) {
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
}

/******************************************************************************/

// applies salt to a password and then runs the SHA-512 algorithm on it a number of times, determined by `options.count`
//
// EXAMPLE OPTIONS
// const exOptions = {
//   count: 3
// };
function encryptPassword(hash, salt, options) {
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

  value = saltHash(hash, salt);
  value = hashValue(value, options);

  return value;
}

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
function makeKey(options) {
  try {
    if (options === undefined || typeof options !== `object`) {
      options = {
        size: 20, // how many characters to generate
        isComplex: false, // if true, the string will include both uppercase and lowercase characters
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
        options.isComplex = toBoolean(options.isComplex);
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
}

module.exports = {
  encryptPassword,
  saltHash,
  hashValue,
  makeHash,
  makeKey,
};
