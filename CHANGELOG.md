## CHANGELOG

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
