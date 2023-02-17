/******************************************************************************/

// converts a string or numeric value to a boolean true or false
function toBoolean(value) {
  if (typeof value === `number`) {
    if (value === 1) {
      return true;
    }
    return false;
  }
  if (typeof value === `string`) {
    value = value.toLowerCase();
    if (value === `true` || value === `yes` || value === `y` || value === `1`) {
      return true;
    }
    return false;
  }
  if (typeof value === `boolean`) {
    return value;
  }
  throw new Error(
    `Error attempting to parse ${JSON.stringify(value)} as a boolean value.`,
  );
}

module.exports = {
  toBoolean,
};
