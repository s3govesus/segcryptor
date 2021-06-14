## CHANGELOG

### 1.5.7: makeHash makeKey reimplemented
- fixed an issue with the last commit where my linter decided to randomly remove `makeHash()` and `makeKey()`

### 1.5.6: module.exports restructure
- restructured how functions are exported to try to fix the previous issues and maybe clean up the code a little

### 1.5.5: another attempt
- trying once again to fix some dumb issue with functions that call `toBoolean()` not working properly in other projects

### 1.5.4: reverted 1.5.2
- reverted the changes in 1.5.2

### 1.5.3: tests and rearrangement
- moved the `toBoolean()` function to the top of the code
- added tests for `toBoolean()`

### 1.5.2: makeKey toBoolean fix
- fixed an issue with `makeKey()` where it was trying to call `toBoolean()` on `this` even though `this` wasn't applicable in that context

### 1.5.1: hexadecimal conversion functions
- added `hexToLatin()` for converting a string of hexadecimal characters to plain-text latin encoded characters
- added `latinToHex()` for converting a string of plain-text latin encoded characters to a string of hexadecimal characters

### 1.4.1: hashValue improvements
- modified `hashValue()` to use the integrated `crypto` API for handling hashing SHA encryptions
- deleted '/sha.js'
- modified `hashValue()` to accept a `type` string property on the `options` for defining which hashing algorithm to use - `'sha256'` for SHA-256 and `'sha512'` for SHA-512

### 1.3.1-1: 256-bit v0 hybrids
- added `0.1`, `1.0`, `0.3`, `3.0`, `0.4`, `4.0`, `0.5`, and `5.0` versions for `makeID()`
- added tests for the new versions of `makeID()`
- modified the `version` option in `makeID()` to require a string as opposed to using a number, since new versions may get confused due to how numbers are interpreted by javascript

### 1.2.3-1: hashValue and other fixes
- fixed issues where functions where attempting to call `hashString()` which was changed to `hashValue()`
- made it so that `makeID256()` and any future functions that aren't exported have an easier time accessing functions that are exported
- updated `eslint` to `7.19.0`
- updated `uuid` to `8.3.2`
- made a minor adjustment to the uuid-checking regular expression
- fixed an issue with uuidv5.1 generation where the first 18 characters of the first part weren't being selected and the entire string was being used instead

### v1.2.2-1: randomBytes wrapper
- added `randomBytes()`, a wrapper for `crypto.randomBytes()` as instances where you would use `encrypt()` or `decrypt()` would commonly want to use that function to generate random bytes of data

### v1.2.1-1: encrypt and decrypt
- added `encrypt()` which takes a string and encrypts it using the `'aes-256-cbc'` algorithm, given a key and IV
- added `decrypt()` which decrypts an `'aes-256-cbc'` encrypted string, given a key and IV
- added a 'test' script to 'package.json'

### 4: hashString renamed
- renamed `hashString()` to `hashValue()` and updated any references to it
- modified `hashValue()` to accept an `options` parameter instead of the `count` parameter, and the `options` parameter has a property for `count`
- improved the way `saltHash()` works

### 3: encryptPassword security
- changed the `security` property on the `options` parameter for `encryptPassword()` to `count` and made it so it is no longer exponentially applied

### 2: optimized makeKey()
- optimized the code for `makeKey()`

### 1: initial commit
- initial commit

---

## TODO

### modify various functions to use Node.js's integrated 'crypto' module for creating SHA-256 and SHA-512 hashes

### add an option to `hashValue()` for using the SHA-256 algorithm instead of only the SHA-512 algorithm

### add `buffer` and `offset` options to v3, v1.3, v3.1, v5, v1.5, and v5.1

### add an option for removing hyphens from the resulting UUID-generated strings
