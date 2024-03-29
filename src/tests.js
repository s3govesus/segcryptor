const {
  makeID, makeHash, makeKey, encryptPassword, hashValue, saltHash, toBoolean, encrypt, decrypt, hexToLatin, latinToHex, webHashValue,
} = require(`../src/index`);

/******************************************************************************/

// test generating a UUIDv1
const exampleMakeIDv1 = makeID({
  version: `1`,
});
console.log(`exampleMakeIDv1: ${exampleMakeIDv1}\r\n`);

/******************************************************************************/

// test generating a UUIDv3
// the namespace option can be
// a UUID, like '12345678-1234-1234-1234-123456789012'
// a URL, like 'https://google.com'
// a DNS address, like 'google.com'
const exampleMakeIDv3 = makeID({
  version: `3`,
  name: `segcryptor! test`,
  namespace: `2762ad30-9dc8-5cf2-8042-8cd411d450fc`,
});
console.log(`makeID : exampleMakeIDv3: ${exampleMakeIDv3}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv3
const exampleMakeIDv13 = makeID({
  version: `1.3`,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`makeID : exampleMakeIDv13: ${exampleMakeIDv13}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv3 and UUIDv1
const exampleMakeIDv31 = makeID({
  version: `3.1`,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`makeID : exampleMakeIDv31: ${exampleMakeIDv31}\r\n`);

/******************************************************************************/

// test generating a UUIDv4
const exampleMakeIDv4 = makeID({
  version: `4`,
});
console.log(`makeID : exampleMakeIDv4: ${exampleMakeIDv4}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv4
const exampleMakeIDv14 = makeID({
  version: `1.4`,
});
console.log(`makeID : exampleMakeIDv14: ${exampleMakeIDv14}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv4 and UUIDv1
const exampleMakeIDv41 = makeID({
  version: `4.1`,
});
console.log(`makeID : exampleMakeIDv41: ${exampleMakeIDv41}\r\n`);

/******************************************************************************/

// test generating a UUIDv5
const exampleMakeIDv5 = makeID({
  version: `5`,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`makeID : exampleMakeIDv5: ${exampleMakeIDv5}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv1 and UUIDv5
const exampleMakeIDv15 = makeID({
  version: `1.5`,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`makeID : exampleMakeIDv15: ${exampleMakeIDv15}\r\n`);

/******************************************************************************/

// test generating a blend of UUIDv5 and UUIDv1
const exampleMakeIDv51 = makeID({
  version: `5.1`,
  name: `segcryptor! test`,
  namespace: `https://github.com/s3govesus/segcryptor`,
});
console.log(`makeID : exampleMakeIDv51: ${exampleMakeIDv51}\r\n`);

/******************************************************************************/

// test generating a 256-bit abomination
const exampleMakeIDv0 = makeID({
  version: `0`,
  seed: `lalalalalalalalalala`,
});
console.log(`makeID : exampleMakeIDv0: ${exampleMakeIDv0}\r\n`);

/******************************************************************************/

// test generating a 256-bit abomination v01
const exampleMakeIDv01 = makeID({
  version: `0.1`,
  seed: `oh no, this is horrible!`,
});
console.log(`makeID : exampleMakeIDv01: ${exampleMakeIDv01}\r\n`);

/******************************************************************************/

const exampleMakeIDv10 = makeID({
  version: `1.0`,
  seed: `oh boy, here we go again!`,
});
console.log(`makeID : exampleMakeIDv10: ${exampleMakeIDv10}\r\n`);

/******************************************************************************/

const exampleMakeIDv03 = makeID({
  version: `0.3`,
  seed: `great...`,
  name: `this is an example name, i guess`,
  namespace: `https://www.google.com`,
});
console.log(`makeID : exampleMakeIDv03: ${exampleMakeIDv03}\r\n`);

/******************************************************************************/

const exampleMakeIDv30 = makeID({
  version: `3.0`,
  seed: `this is some seed!`,
  name: `names are dumb`,
  namespace: `https://namespacesaredumber.com`,
});
console.log(`makeID : exampleMakeIDv30: ${exampleMakeIDv30}\r\n`);

/******************************************************************************/

const exampleMakeIDv04 = makeID({
  version: `0.4`,
  seed: `what is a seed?`,
});
console.log(`makeID : exampleMakeIDv04: ${exampleMakeIDv04}\r\n`);

/******************************************************************************/

const exampleMakeIDv40 = makeID({
  version: `4.0`,
  seed: `broccoli smells a lot like farts - it's my favorite vegetable!`,
});
console.log(`makeID : exampleMakeIDv40: ${exampleMakeIDv40}\r\n`);

/******************************************************************************/

const exampleMakeIDv05 = makeID({
  version: `0.5`,
  seed: `i hate you, kind of...`,
  name: `it ain't what they call you, it's what you answer to`,
  namespace: `https://wcfields.com`,
});
console.log(`makeID : exampleMakeIDv05: ${exampleMakeIDv05}\r\n`);

/******************************************************************************/

const exampleMakeIDv50 = makeID({
  version: `5.0`,
  seed: `a seed neither fears light nor darkness, but uses both to grow`,
  name: `Matshona Dhliwayo`,
  namespace: `https://matshonadhliwayo.net`,
});
console.log(`makeID : exampleMakeIDv50: ${exampleMakeIDv50}\r\n`);

/******************************************************************************/

// test creating a random hexadecimal string
const exampleMakeHash = makeHash({
  size: 8,
  isSecure: true,
});
console.log(`makeHash : exampleMakeHash: ${exampleMakeHash}\r\n`);

/******************************************************************************/

// test generating a random alpha-numeric string
const exampleMakeKey = makeKey({
  size: 16,
  isComplex: true,
});
console.log(`makeKey : exampleMakeKey: ${exampleMakeKey}\r\n`);

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
console.log(`encryptPassword : exampleEncryptPassword: ${exampleEncryptPassword}\r\n`);

/******************************************************************************/

// test applying salt to a password hash
const saltedHash = saltHash(passwordHash, salt);
console.log(`saltHash : saltedHash: ${saltedHash}\r\n`);

/******************************************************************************/

// test applying the SHA-512 algorithm to a string
const exampleHashValue512 = hashValue(`this is an example`, { count: 5, type: `sha512` });
console.log(`hashValue : exampleHashValue512: ${exampleHashValue512}\r\n`);

const exampleHashValue256 = hashValue(`this is an example`, { count: 12, type: `sha256` });
console.log(`hashValue : exampleHashValue256: ${exampleHashValue256}\r\n`);

const exampleHashValue512v2 = webHashValue(`this is an example`, { count: 7, type: `sha512` });
console.log(`webHashValue : exampleHashValue512v2: ${exampleHashValue512v2}\r\n`);

/******************************************************************************/

const exampleToBoolean1 = toBoolean(`true`);
console.log(`toBoolean : exampleToBoolean1 : ${exampleToBoolean1}`);

const exampleToBoolean2 = toBoolean(1);
console.log(`toBoolean : exampleToBoolean2 : ${exampleToBoolean2}`);

const exampleToBoolean3 = toBoolean(`off`);
console.log(`toBoolean : exampleToBoolean3 : ${exampleToBoolean3}`);

/******************************************************************************/

// test the encrypt() and decrypt() functions
function testEncryptDecrypt() {
  console.log(`Testing the encrypt() and decrypt() functions...`);
  console.log();

  let testStr = `This is a test.`;
  console.log(`testStr : ${testStr}`);

  let key = makeHash({
    size: 32,
  });
  console.log(`key : ${key}`);

  let iv = makeHash({
    size: 16,
  });
  console.log(`iv : ${iv}`);

  const encryptedStr = encrypt(testStr, key, iv);
  console.log(`encryptedStr : ${encryptedStr}`);
  let decryptedStr = decrypt(encryptedStr, key, iv);
  console.log(`decryptedStr : ${decryptedStr}`);
  console.log();
  console.log(`Finished testing the encrypt() and decrypt() functions!`);
  console.log(``);
  console.log(`/******************************************************************************/`);
  console.log(``);
}
testEncryptDecrypt();

/******************************************************************************/

// test the latinToHex function
function testLatinToHex() {
  console.log(`Testing the latinToHex() function...`);
  console.log();
  let testStr = `this is a test`;
  let hex = latinToHex(testStr);
  console.log(`this is a test : ${hex}`);
  console.log();
  console.log(`Finished testing the latinToHex() function!`);
  console.log();
  console.log(`/******************************************************************************/`);
  console.log();
}
testLatinToHex();

/******************************************************************************/

// test the hexToLatin function
function testHexToLatin() {
  console.log(`Testing the hexToLatin() function...`);
  console.log();
  let testStr = `7468697320697320612074657374`;
  let latin = hexToLatin(testStr);
  console.log(`7468697320697320612074657374 : ${latin}`);
  console.log();
  console.log(`Finished testing the hexToLatin() function!`);
  console.log();
  console.log(`/******************************************************************************/`);
  console.log();
}
testHexToLatin();
