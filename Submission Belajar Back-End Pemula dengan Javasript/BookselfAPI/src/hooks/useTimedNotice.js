import { useCallback, useRef, useState } from 'react';

const useTimedNotice = (timeout = 3000) => {
  const [notice, setNotice] = useState({ type: '', message: '' });
  const timerRef = useRef(null);

  const showNotice = useCallback((type, message) => {
    setNotice({ type, message });

    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setNotice({ type: '', message: '' });
    }, timeout);
  }, [timeout]);

  const clearNotice = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setNotice({ type: '', message: '' });
  }, []);

  return { clearNotice, notice, showNotice };
};

export default useTimedNotice;
