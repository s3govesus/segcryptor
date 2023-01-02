const { StringDecoder } = require(`string_decoder`);

const hexToLatin = (hexStr) => {
  let result;

  result = hexStr.split(/(\w\w)/g)
    .filter((p) => !!p)
    .map((c) => String.fromCharCode(parseInt(c, 16)))
    .join("");

  return result;
};

const plainToHex = (plainStr) => {
  let result;

  result = plainStr.split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, `0`))
    .join(``);

  return result;
};

let test1 = 'this is a test string';
let x = plainToHex(test1);
console.log(x);

let test2 = hexToLatin(x);
console.log(test2);
