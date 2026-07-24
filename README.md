# segcryptor

This is a library of functions for use in encrypting passwords, generating UUIDs, generating random strings of hexadecimal data, or even generating a random alphanumeric key. Any encryption hashing is handled by Node's `crypto` module (SHA-256/SHA-512), and string encryption is handled by the `aes-256-cbc` algorithm.

## Installation

```
npm install segcryptor
```

## Usage

```js
const {
  makeID, makeHash, makeKey, encryptPassword, saltHash, encrypt, decrypt,
  hashValue, webHashValue, toBoolean, randomBytes, hexToLatin, latinToHex,
} = require(`segcryptor`);
```

## makeID(options)
Generates a UUID, or a segcryptor-specific ID, based on the `options.version` given.

- `options.version` *(string, default `'4'`)* - which ID scheme to use (see table below). **Must be a string** - see the [Note](#note) below.
- `options.name` *(string, default `Date.now().toString()`)* - the `name` used by the UUIDv3/v5 algorithms.
- `options.namespace` *(string, default `'https://github.com/s3govesus/segcryptor'`)* - the `namespace` used by the UUIDv3/v5 algorithms. Can be an existing UUID string, a URL, or a DNS name - if it isn't already a valid UUID, one will be generated from it first.
- `options.seed` *(string, default `Date.now().toString()`)* - optional seed data mixed into the segcryptor-specific `'0'` ID scheme.

| `version` | Description |
| --- | --- |
| `'1'` | A timestamp-based UUIDv1 |
| `'3'` | A namespace + name based UUIDv3 (MD5) |
| `'4'` | A random UUIDv4 (the default) |
| `'5'` | A namespace + name based UUIDv5 (SHA-1) |
| `'0'` | A segcryptor-specific, SHA-512-derived 256-bit ID, formatted like a UUID but longer, with an optional `seed` |
| `'1.3'`, `'3.1'`, `'1.4'`, `'4.1'`, `'1.5'`, `'5.1'` | Hybrids that splice together the first/second half of two different UUID versions (e.g. `'1.3'` uses the first half of a UUIDv1 and the second half of a UUIDv3) |
| `'0.1'`, `'1.0'`, `'0.3'`, `'3.0'`, `'0.4'`, `'4.0'`, `'0.5'`, `'5.0'` | Hybrids that combine the `'0'` scheme with a UUIDv1/v3/v4/v5, producing a longer, double-length ID |

```js
makeID({ version: `4` });
// => 'e6c80450-86fa-11f1-aee7-8b4a28125722'

makeID({ version: `5`, name: `example`, namespace: `https://example.com` });
```

## makeHash(options)
Generates a string of random hexadecimal characters for a given number of bytes.

- `options.size` *(number, default `64`)* - how many bytes of random data to generate. There are 2 hexadecimal characters per byte, so the resulting string length will be twice `options.size`.
- `options.isSecure` *(boolean, default `false`)* - if `true`, the bytes are generated using `crypto.randomBytes()`, a cryptographically secure random source. If `false`, `Math.random()` is used instead, which is faster but **not** cryptographically secure.

```js
makeHash({ size: 32, isSecure: true });
```

## makeKey(options)
Generates a random alphanumeric key string.

- `options.size` *(number, default `20`)* - how many characters to generate. Must be an integer greater than or equal to `1`.
- `options.isComplex` *(boolean, default `false`)* - if `false`, only lowercase letters and digits (`0-9a-z`) are used. If `true`, both uppercase and lowercase letters plus digits (`0-9a-zA-Z`) are used.

```js
makeKey({ size: 16, isComplex: true });
```

## encryptPassword(hash, salt, options)
Combines a password `hash` with a `salt` (via `saltHash()`) and then hashes the result using SHA-512, repeated `options.count` times. Intended for storing a password hash alongside its salt so it can be re-verified later.

- `hash` *(string)* - the password, already hashed at least once (e.g. via `hashValue()`).
- `salt` *(string)* - a random salt string (e.g. generated via `makeHash()`).
- `options.count` *(number, default `3`)* - how many times to apply the SHA-512 algorithm to the salted hash.

```js
const hash = hashValue(`my password`);
const salt = makeHash({ size: 64 });
encryptPassword(hash, salt, { count: 512 });
```

## saltHash(hash, salt)
Interleaves the characters of `hash` and `salt`, character by character, and returns the combined string. Used internally by `encryptPassword()`, but can be used on its own to combine a hash with a salt before hashing it yourself.

```js
saltHash(passwordHash, salt);
```

## encrypt(string, key, iv)
Encrypts `string` using the `aes-256-cbc` algorithm and returns a hexadecimal string.

- `key` *(string | Buffer)* - a 32-byte key. If a string is given, it's treated as hexadecimal.
- `iv` *(string | Buffer)* - a 16-byte initialization vector, which should be random for every encryption. If a string is given, it's treated as hexadecimal.

```js
const key = makeHash({ size: 32 });
const iv = makeHash({ size: 16 });
const encrypted = encrypt(`This is a test.`, key, iv);
```

## decrypt(data, key, iv)
Decrypts `data` that was previously encrypted with `encrypt()`, using the same `key` and `iv`, and returns the original string.

```js
decrypt(encrypted, key, iv);
// => 'This is a test.'
```

## hashValue(string, options)
Takes a `string` of data and applies a hashing algorithm to it, optionally more than once, and returns the result as a hexadecimal string.

- `options.count` *(number, default `1`)* - how many times to apply the hashing algorithm.
- `options.type` *(string, default `'sha512'`)* - which algorithm to use, e.g. `'sha256'` or `'sha512'`.

```js
hashValue(`this is an example`, { count: 5, type: `sha512` });
```

### webHashValue(string, options)
An alias for `hashValue()`, kept for backwards compatibility with earlier versions of this library where the two functions were implemented differently.

## hexToLatin(hexString)
Converts a string of hexadecimal characters into a plain-text, latin1-encoded string.

```js
hexToLatin(`7468697320697320612074657374`);
// => 'this is a test'
```

## latinToHex(latin1String)
Converts a plain-text, latin1-encoded string into a string of hexadecimal characters.

```js
latinToHex(`this is a test`);
// => '7468697320697320612074657374'
```

## toBoolean(value)
Converts a string, number, or boolean value into a `true`/`false` boolean.

- Strings: `'true'`, `'yes'`, `'y'`, or `'1'` (case-insensitive) become `true`; anything else becomes `false`.
- Numbers: `1` becomes `true`; anything else becomes `false`.
- Booleans are returned as-is.
- Any other type throws an `Error`.

```js
toBoolean(`yes`); // => true
toBoolean(0); // => false
```

## randomBytes(size)
A thin wrapper around `crypto.randomBytes()`, since it's commonly needed alongside `encrypt()`/`decrypt()`. Returns a `Buffer` of `size` random bytes.

```js
randomBytes(16);
```

## Note
If you use `makeID()`, the `version` option needs to be a string, because `1.0` and `1` are seen as the same value when interpreted as a number, whereas the strings `'1.0'` and `'1'` are not the same value.

## Testing
```
npm test
```
Runs `src/tests.js`, which exercises every function exported by this library and logs example output to the console.

## License
MIT - see [LICENSE](LICENSE) for details.
