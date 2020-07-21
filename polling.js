/**
 * Polls a function for a set amount of time.
 * @param {*} fn function to run
 * @param {*} ms poll delay in milliseconds
 */
export async function poll(fn, ms) {
  await fn();
  while (true) {
    await wait(ms);
    await fn();
  }
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
