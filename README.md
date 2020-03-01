# segcryptor
This is a library of functions for use in encrypting passwords, generating UUIDs, generating random strings of hexadecimal data, or even generating a random alphanumeric key.  Any encryption is handled by the SHA-512 encryption algorithm.

## function : makeID(options)
This function generates a UUID string using versions 1, 3, 4, or 5, or my own special blends of those versions, or a custom 256-bit UUID that looks like two 128-bit UUID strings concatenated with a hyphen.  It is recommended that you stick to the standard official versions of UUID.

### parameter : 'options'
The options parameter is used to define various behaviors of the function and is a data object consisting of the following properties:
### property : 'options.version'
This property on the options parameter specifies which version of UUID you want to generate, with the following possibilities:
#### Official Standard UUID Versions
##### UUIDv1
Concatenates the 48-bit MAC address of the computer generating the UUID with a 60-bit timestamp to generate an ID.

##### UUIDv3
Hashes a namespace identifier with a name using MD5 as the hashing algorithm.

##### UUIDv4
Generates 122 bits of random data, with 5.3 undecillion possibilities, but note that this does create a very slight possibility of collisions.

##### UUIDv5
Works the same way as UUIDv3, hashes a namespace identifier with a name, but uses SHA-1 as the hashing algorithm, instead of MD5.

#### Unofficial Non-standard UUID Versions
##### UUIDv1.3
This version uses the first 16 hexadecimal characters from UUIDv1 and then the rest from UUIDv3.  This method requires a name and namespace string in the options parameter, otherwise it will attempt to fill them in with defaults.

##### UUIDv1.4
This version uses the first 16 hexadecimal characters from UUIDv1 and then the rest from UUIDv4.

##### UUIDv1.5
This version uses the first 16 hexadecimal characters from UUIDv1 and then the rest from UUIDv5.  This method requires a name and namespace string in the options parameter, otherwise it will attempt to fill them in with defaults.

##### UUIDv3.1
This version uses the first 16 hexadecimal characters from UUIDv3 and then the rest from UUIDv1.  This method requires a name and namespace string in the options parameter, otherwise it will attempt to fill them in with defaults.

##### UUIDv4.1
This version uses the first 16 hexadecimal characters from UUIDv4 and then the rest from UUIDv1.

##### UUIDv5.1
This version uses the first 16 hexadecimal characters from UUIDv5 and then the rest from UUIDv1.  This method requires a name and namespace string in the options parameter, otherwise it will attempt to fill them in with defaults.

##### UUIDv0
This version generates 256-bits of random data in a format similar to two 128-bit UUIDs concatenated by a hyphen.

### property : 'options.name'
This is the name component that is hashed with a namespace in UUIDv3 and UUIDv5.  This can be any string of characters.

### property : 'options.namespace'
This is the namespace component that is hashed with a name in UUIDv3 and UUIDv5.  This can be a URL, such as `https://github.com/s3govesus/segcryptor`; a domain name, such as `github.com`; or a UUID string, such as `12345678-1234-1234-1234-123456789012`

### property : 'options.seed'
This is an optional property on the options parameter that can be used to influence the random result of UUIDv0 generation.  This can be any string of characters.

#### Options Properties Table
| name      | type   | description                                                                                                    |
|-----------|--------|----------------------------------------------------------------------------------------------------------------|
| version   | number | determines which version of UUID to generate                                                                   |
| name      | string | used in UUIDv3, UUIDv1.3, UUIDv3.1, UUIDv5, UUIDv1.5, and UUIDv5.1 - can be any character string               |
| namespace | string | used in UUIDv3, UUIDv1.3, UUIDv3.1, UUIDv5, UUIDv1.5, and UUIDv5.1 - can be a URL, domain name, or UUID string |
| seed      | string | optional, used in UUIDv0 (a hacky, unnofficial random 256-bit UUID)                                            |

### Examples
```
// to generate a UUIDv1 string:
let exampleIDv1 = makeID({
  version: 1
});
// exampleIDv1 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv3 string:
let exampleIDv3 = makeID({
  version: 3,
  name: 'segcryptor! test',
  namespace: 'https://github.com/s3govesus/segcryptor'
});
// exampleIDv3 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUID 1.3 string (a mix of UUIDv1 and UUIDv3 - not official):
let exampleIDv13 = makeID({
  version: 1.3,
  name: 'segcryptor! test',
  namespace: '12345678-1234-1234-1234-123456789012'
});
// exampleIDv13 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUID 3.1 string:
let exampleIDv31 = makeID({
  version: 3.1,
  name: 'segcryptor! test',
  namesapce: '12345678-1234-1234-1234-123456789012'
});
// exampleIDv31 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv4 string:
let exampleIDv4 = makeID({
  version: 4
});
// exampleIDv4 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUID 1.4 string (a mix of UUIDv1 and UUIDv4 - not official):
let exampleIDv14 = makeID({
  version: 1.4
});
// exampleIDv14 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv4.1 string:
let exampleIDv41 = makeID({
  version: 4.1
});
// exampleIDv41 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv5 string:
let exampleIDv5 = makeID({
  version: 5,
  name: 'segcryptor! test - some string',
  namespace: 'https://github.com'
});
// exampleIDv5 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUID 1.5 string (a mix of UUIDv1 and UUIDv5 - not official):
let exampleIDv15 = makeID({
  version: 1.5,
  name: 'segcryptor!',
  namespace: 'github.com'
});
// exampleIDv15 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv5.1 string:
let exampleIDv51 = makeID({
  version: 5.1,
  name: 'segcryptor!',
  namespace: 'github.com'
});
// exampleIDv51 value:
// '12345678-1234-1234-1234-123456789012'

// to generate a UUIDv0 string (a random 256-bit pseudo UUID string that looks like a concatenation of two standard 128-bit UUID strings):
let exampleIDv0 = makeID({
  version: 0,
  seed: 'some random seed string'
});
// exampleIDv0 value:
// '12345678-1234-1234-1234-123456789012-12345678-1234-1234-1234-123456789012'
```

---

## function : makeHash(options)
This function generates a random hexadecimal hash string, where the `size` property on the `options` parameter is the number of bytes of hexadecimal data to generate.  The `isSecure` property on the `options` parameter informs the function to generate the data a little more slowly, but with greater difficulty in predicting the result, by generating bytes at random positions in the total string until the string is filled in for the given size.

### parameter : 'options'
The options parameter is used to define various behaviors of the function and is a data object consisting of the following properties:

### property : 'options.size'
This is a number value that defines how many bytes of data to generate.  The length of the string that `makeHash()` generates is equal to `options.size` * 2.

### property : 'options.isSecure'
This is a boolean value that tells `makeHash()` to generate the bytes of data in the hexadecimal string in a random order, making the resulting string a little more difficult to predict.

#### Options Properties Table
| name     | type    | description                                                                                      |
|----------|---------|--------------------------------------------------------------------------------------------------|
| size     | number  | how many bytes of hexadecimal data to generate : resulting string length = size * 2              |
| isSecure | boolean | whether or not to use the slower, but more secure, means of generating the bytes in random order |

### Example
```
let foo64 = makeHash({
  size: 64,
  isSecure: false
});

// foo64 = '43b71277bc68e66a5f183da93211c0e6796a0ece455e926556c01de44a9131eba4d10dc8869e20a5d2631231f48b43e494a29182997ca7702f162a6f78349e0e'
```

---

## function : makeKey(options)
This function generates a random alpha-numeric character string.

### parameter : 'options'
The options parameter is used to define various behaviors of the function and is a data object consisting of the following properties:

### property : 'options.size'
This is a number value that tells the `makeKey()` function how many alphanumeric characters to put in the resulting character string.

### property : 'options.isComplex'
This is a boolean value that tells the `makeKey()` function to use both uppercase and lowercase letters in the resulting character string, `options.isComplex: false` results in only lowercase letters.

#### Options Properties Table
| name      | type    | description                                                                                             |
|-----------|---------|---------------------------------------------------------------------------------------------------------|
| size      | number  | how many characters to generate                                                                         |
| isComplex | boolean | whether or not the character string is case-sensitive and includes both uppercase and lowercase letters |

---

## function : encryptPassword(hash, salt, options)
This function takes a hashed password string (as passwords should always be encrypted before transmitting to a remote server), attempts to interleave it with a salt string, and then applies the SHA-512 encryption algorith to it a number of times.  The `security` property on the `options` parameter determines how many times it runs the SHA-512 hashing algorithm.

### parameter : 'hash'
An encrypted password hash string that will have a salt applied to it and then the combination encrypted again for optimal security.  For best results, it is recommended that you use the SHA-512 algorithm to hash the password, but it will work with any character string.

### parameter : 'salt'
The salt hash string that will be applied to the password hash string and then encrypted.  If you need to generate a salt, you can use `makeHash({ size: 64, isSecure: false })` from the `makeHash()` function in this library.

### parameter : 'options'
The options parameter is used to define various behaviors of the function and is a data object consisting of the following properties:

### property : 'options.security'
This is a number value, ranging from 0 to 10, that tells `encryptPassword()` how many times to run the hashing algorithm for adding security against certain types of hacking techniques.  The number of times the function runs the hashing algorithm is equal to 2 to the power of this number, with a minimum of 0 for 2^0 = 1 run, up to a maximum of 10 for 2^10 = 1024 runs.  Lower numbers are ideal for more performance demanding programs, whereas a number of at least 7 (x128) is recommended for more secure applications.

#### Options Properties Table
| name     | type   | description                           |
|----------|--------|---------------------------------------|
| security | number | A security level ranging from 0 to 10 |

---

## function : saltHash(hash, salt)
This function attempts to combine a password hash string and a salt string by interleaving if the two strings are the same length, or simply by concatenating them otherwise.  The combined string is then put through the SHA-512 encryption algorithm to create the resulting 512-bit 128-character hexadecimal string.  For best results, it is recommended that you use the SHA-512 encrpytion algorithm to hash the password, which can be done by using `hashString(password, 1)` from this library, and then generating a 512-bit hexadecimal salt of equal length, which can be done by using `makeHash({ size: 64, isSecure: false})` from this library as well.  You should already be aware of this, but if you're using these functions for account security on a website, you will need to store the salt in the server's database, along with the fully encrypted password that results from running `encryptPassword()` from this library.

### parameter : 'hash'
This is presumably an encrypted password hash string.  This string is combined with the `salt` parameter in the `saltHash()` function.

### parameter : 'salt'
This is presumably a hexidecimal string of the same length as the password hash, but can be any character string.  This string is combined with the `hash` parameter in the `saltHash()` function.

### Example
```
let passwordHash = '43b71277bc68e66a5f183da93211c0e6796a0ece455e926556c01de44a9131eba4d10dc8869e20a5d2631231f48b43e494a29182997ca7702f162a6f78349e0e';
let salt = '9f3313fa38e30bd23db2445f5e57202f73dcc07d13c218b9e62cbeadd6da633f0e81defd6f8d013a7e556ac967cd2b5da0f876908ccb2b0e57fc8df41b948685';
let saltedPasswordHash = saltHash(passwordHash, salt);

// saltedPasswordHash = 'b96e51bb07c224ab7791ddaf31d7c33984931adc10ccb01e26b3a0c347c6e456686a22136baffc330317f3f54ef55d0d1ebbcbf99304ee8c625cea776f1444a9'
```

---

## function : hashString(str, count)
`encryptPassword()` usually does this for you, but if you want to write your own methods with more granular control, you can use this to apply the SHA-512 hashing algorithm to a string.

### parameter : 'str'
This is a character string value, usually a password, that then has the SHA-512 encryption algorithm applied to a number of times (however many specified by the `count` parameter).  As a side note, passwords should always be encrypted on the client machine before submitting it to a server.

### parameter : 'count'
This is a number value that tells the `hashString()` function how many times to run the `str` parameter through the SHA-512 hashing algorithm.

### Example
```
let foo = hashString('this is an example', 5);

// foo = 43b71277bc68e66a5f183da93211c0e6796a0ece455e926556c01de44a9131eba4d10dc8869e20a5d2631231f48b43e494a29182997ca7702f162a6f78349e0e
```
