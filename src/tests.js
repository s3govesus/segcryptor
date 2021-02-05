const {
  makeID, makeHash, makeKey, encryptPassword, hashValue, saltHash,
} = require(`../src/index`);

/******************************************************************************/

// test generating a UUIDv1
const exampleMakeIDv1 = makeID({
  version: 1,
});
console.log(`exampleMakeIDv1: ${exampleMakeIDv1}\r\n`);

/******************************************************************************/

// test generating a UUIDv3
// the namespace option can be
// a UUID, like '12345678-1234-1234-1234-123456789012'
// a URL, like 'https://google.com'
// a DNS address, like 'google.com'
const exampleMakeIDv3 = makeID({
  version: 3,
  name: `segcryptor! test`,
  namespace: `2762ad30-9dc8-5cf2-8042-8cd411d450fc`,
});
console.log(`exampleMakeIDv3: ${exampleMakeIDv3}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv3
const exampleMakeIDv13 = makeID({
  version: 1.3,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`exampleMakeIDv13: ${exampleMakeIDv13}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv3 and UUIDv1
const exampleMakeIDv31 = makeID({
  version: 3.1,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`exampleMakeIDv31: ${exampleMakeIDv31}\r\n`);

/******************************************************************************/

// test generating a UUIDv4
const exampleMakeIDv4 = makeID({
  version: 4,
});
console.log(`exampleMakeIDv4: ${exampleMakeIDv4}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv4
const exampleMakeIDv14 = makeID({
  version: 1.4,
});
console.log(`exampleMakeIDv14: ${exampleMakeIDv14}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv4 and UUIDv1
const exampleMakeIDv41 = makeID({
  version: 4.1,
});
console.log(`exampleMakeIDv41: ${exampleMakeIDv41}\r\n`);

/******************************************************************************/

// test generating a UUIDv5
const exampleMakeIDv5 = makeID({
  version: 5,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`exampleMakeIDv5: ${exampleMakeIDv5}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv5
const exampleMakeIDv15 = makeID({
  version: 1.5,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`exampleMakeIDv15: ${exampleMakeIDv15}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv5 and UUIDv1
const exampleMakeIDv51 = makeID({
  version: 5.1,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`exampleMakeIDv51: ${exampleMakeIDv51}\r\n`);

/******************************************************************************/

// test generating a 256-bit abomination
const exampleMakeIDv0 = makeID({
  version: 0,
  seed: `lalalalalalalalalala`,
});
console.log(`exampleMakeIDv0: ${exampleMakeIDv0}\r\n`);

/******************************************************************************/

// test creating a random hexadecimal string
const exampleMakeHash = makeHash({
  size: 8,
  isSecure: true,
});
console.log(`exampleMakeHash: ${exampleMakeHash}\r\n`);

/******************************************************************************/

// test generating a random alpha-numeric string
const exampleMakeKey = makeKey({
  size: 16,
  isComplex: true,
});
console.log(`exampleMakeKey: ${exampleMakeKey}\r\n`);

/******************************************************************************/

// test combining a salt hash with a password hash and then encrypting the result
// the password should be hashed at least once, using the SHA-512 algorithm, which can be done by calling 'hashString('the password string', numberOfTimesToHash)'
// the salt should also be a 128-character hexadecimal string, like you would get after running SHA-512, or you could generate a random salt by using 'makeHash({size:64, isSecure:false})'
const passwordHash = `43b71277bc68e66a5f183da93211c0e6796a0ece455e926556c01de44a9131eba4d10dc8869e20a5d2631231f48b43e494a29182997ca7702f162a6f78349e0e`;
const salt = `9f3313fa38e30bd23db2445f5e57202f73dcc07d13c218b9e62cbeadd6da633f0e81defd6f8d013a7e556ac967cd2b5da0f876908ccb2b0e57fc8df41b948685`;
const exampleEncryptPassword = encryptPassword(passwordHash, saltHash, {
  security: 9, // this should run the SHA-512 algorithm 512 times to help prevent dictionary attacks
});
console.log(`passwordHash: ${passwordHash}`);
console.log(`salt: ${salt}`);
console.log(`exampleEncryptPassword: ${exampleEncryptPassword}\r\n`);

/******************************************************************************/

// test applying salt to a password hash
const saltedHash = saltHash(passwordHash, salt);
console.log(`saltedHash: ${saltedHash}\r\n`);

/******************************************************************************/

// test applying the SHA-512 algorithm to a string
const exampleHashValue = hashValue(`this is an example`, { count: 5 });
console.log(`exampleHashValue: ${exampleHashValue}\r\n`);

// TODO add encrypt and decrypt tests
