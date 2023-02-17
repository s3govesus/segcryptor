const { v1: uuidv1 } = require(`uuid`);
// there is no uuidv2 function
const { v3: uuidv3 } = require(`uuid`);
const { v4: uuidv4 } = require(`uuid`);
const { v5: uuidv5 } = require(`uuid`);

const { hashValue, saltHash } = require(`./hash`);

const uuidRegex = /^([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})$/g;

/******************************************************************************/

// generates an ID usually made up of one or more of the UUID algorithms
//
// EXAMPLE OPTIONS
// const options = {
//   version: 4, // the version of UUID or segcryptor-specific ID to generate
//   name: `segcryptor default`, // UUIDv3 or UUIDv5 specific parameter
//   namespace: `https://github.com/s3govesus/segcryptor`, // UUIDv3 or UUIDv5 specific parameter
//   seed: `1582683512738` // version 0 / segcryptor-specific parameter of random data - uses Date.now().toString() by default
// };
function makeID(options) {
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
}

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

module.exports = {
  makeID,
};
