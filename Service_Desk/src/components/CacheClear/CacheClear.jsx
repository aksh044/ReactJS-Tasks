import React, { useEffect, useState } from "react";

const CacheClear = () => {
  const [reloadFlag, setReloadFlag] = useState(false);
  useEffect(() => {
    const clearCacheAndReload = () => {
      if ("caches" in window) {
        // Clear all cached resources
        caches.keys().then((cacheNames) => {
          cacheNames.forEach((cacheName) => {
            caches.delete(cacheName);
          });
        });
      }

      setReloadFlag(true);
    };

    if (!reloadFlag) {
      clearCacheAndReload();
    }
  }, [reloadFlag]);

  return <></>;
};

export default CacheClear;
