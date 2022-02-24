import React, { useRef, useEffect } from 'react';

function useForwardedRef(ref: React.ForwardedRef<HTMLTextAreaElement>) {
  const innerRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref) return;

    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  }, [ref]);

  return innerRef;
}

export default useForwardedRef;
