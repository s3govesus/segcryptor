# segcryptor
This is a library of functions for use in encrypting passwords, generating UUIDs, generating random strings of hexadecimal data, or even generating a random alphanumeric key.  Any encryption is handled by the SHA-512 encryption algorithm.

## Note
Note that if you use `makeID()` the `version` option needs to be a string because `1.0` and `1` are seen as the same numeric value, whereas the strings of `'1.0'` and `'1'` are not the same string value
