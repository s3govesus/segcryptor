## TODO

### add `buffer` and `offset` options to v3, v1.3, v3.1, v5, v1.5, and v5.1

---

## CHANGELOG

### 1.2.3-1 : hashValue and other fixes
- fixed issues where functions where attempting to call `hashString()` which was changed to `hashValue()`
- made it so that `makeID256()` and any future functions that aren't exported have an easier time accessing functions that are exported
- updated `eslint` to `7.19.0`
- updated `uuid` to `8.3.2`
- made a minor adjustment to the uuid-checking regular expression
- fixed an issue with uuidv5.1 generation where the first 18 characters of the first part weren't being selected and the entire string was being used instead

### v1.2.2-1 : randomBytes wrapper
- added `randomBytes()`, a wrapper for `crypto.randomBytes()` as instances where you would use `encrypt()` or `decrypt()` would commonly want to use that function to generate random bytes of data

### v1.2.1-1 : encrypt and decrypt
- added `encrypt()` which takes a string and encrypts it using the `'aes-256-cbc'` algorithm, given a key and IV
- added `decrypt()` which decrypts an `'aes-256-cbc'` encrypted string, given a key and IV
- added a 'test' script to 'package.json'

### 4 : hashString renamed
- renamed `hashString()` to `hashValue()` and updated any references to it
- modified `hashValue()` to accept an `options` parameter instead of the `count` parameter, and the `options` parameter has a property for `count`
- improved the way `saltHash()` works

### 3 : encryptPassword security
- changed the `security` property on the `options` parameter for `encryptPassword()` to `count` and made it so it is no longer exponentially applied

### 2 : optimized makeKey()
- optimized the code for `makeKey()`

### 1 : initial commit
- initial commit
