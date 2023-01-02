# segcryptor
This is a library of functions for use in encrypting passwords, generating UUIDs, generating random strings of hexadecimal data, or even generating a random alphanumeric key.  Any encryption is handled by the SHA-512 encryption algorithm.

## makeID(options)

## makeHash(options)
Generates a string of random hexadecimal characters for a given number of bytes, where `options.size` is the number of bytes. Note that there are 2 characters per byte, so the string length will be twice the `options.size` value.

## makeKey(options)

## encryptPassword(hash, salt, options)

## saltHash(hash, salt)

## encrypt(string, key, iv)

## decrypt(data, key, iv)

## hashValue(string, options)
Takes a `string` of data and applies a SHA-512 encryption hashing algorithm to it to generate a string of 128 hexadecimal characters.

## toBoolean(value)

## randomBytes(size)
Generates a buffer of random hexadecimal data, where `size` is a given integer for the number of pairs of random hexadecimal data to be generated.

## Note
Note that if you use `makeID()` the `version` option needs to be a string because `1.0` and `1` are seen as the same value when interpreted as a number, whereas the strings of `'1.0'` and `'1'` are not the same value
