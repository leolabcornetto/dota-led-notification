/**
 * Polls a function for a set amount of time.
 * @param {*} fn function to run
 * @param {*} fnCondition condition to run
 * @param {*} ms poll delay in milliseconds
 * @param {*} cb callback
 */
async function poll(fn, fnCondition, ms, cb) {
  await fn();
  while (fnCondition()) {
    await wait(ms);
    await fn();
  }
  await cb();
}

/**
 * Wait for a set amount of time.
 * @param {*} ms amount of time to wait in milliseconds
 */
function wait(ms = 1000) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = poll;
