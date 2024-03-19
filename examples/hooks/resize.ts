import { useEffect } from "react";

const useResize = (callback: (...args: unknown[]) => unknown) => {
  useEffect(() => {
    callback();
    window.addEventListener("resize", callback, {
      passive: true,
    });
    return () => window.removeEventListener("resize", callback);
  }, [callback]);
};

export default useResize;
