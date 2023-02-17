function generateUUIDv1() {
  let timestamp = Date.now();
  const uuid = `xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, (c) => {
    const r = (timestamp + Math.random() * 16) % 16 | 0;
    timestamp = Math.floor(timestamp / 16);
    return (c === `x` ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

module.exports = {
  generateUUIDv1,
};
