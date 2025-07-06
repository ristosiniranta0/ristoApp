import { memoize } from 'lodash';
import { SECOND } from '../constants/time';

const getFetchWithTimeout = memoize((timeout = SECOND * 30) => {
  if (!Number.isInteger(timeout) || timeout < 1) throw new Error('Must specify positive integer timeout.');
  return async function fetchWithTimeout(url, opts) {
    const abortController = new window.AbortController();
    const abortSignals = [abortController.signal];
    if (opts?.signal) abortSignals.push(opts.signal);

    const combinedAbortController = new AbortController();
    const abortHandler = () => combinedAbortController.abort();
    abortSignals.forEach(sig => sig.addEventListener('abort', abortHandler));

    const f = window.fetch(url, { ...opts, signal: combinedAbortController.signal });
    const timer = setTimeout(() => abortController.abort(), timeout);

    try { return await f; } finally {
      clearTimeout(timer);
      abortSignals.forEach(sig => sig.removeEventListener('abort', abortHandler));
    }
  };
});

export default getFetchWithTimeout;
