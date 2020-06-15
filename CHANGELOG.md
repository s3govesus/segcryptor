## CHANGELOG

### 5 : v1.2.1 : encrypt and decrypt
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

---

## TODO
