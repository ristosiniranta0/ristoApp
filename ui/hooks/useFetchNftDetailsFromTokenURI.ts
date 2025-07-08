import { useState, useEffect } from 'react';

const useFetchNftDetailsFromTokenURI = (tokenURI?: string | null) => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!tokenURI) return;

    (async () => {
      try {
        const response = await fetch(tokenURI);
        if (!response.ok) return;

        let rawData = await response.text();
        rawData = rawData.replace(/,\s*}/g, '}').replace(/,\s*\]/g, ']');

        const data = JSON.parse(rawData);
        setImage(data.image || '');
        setName(data.name || '');
      } catch {}
    })();
  }, [tokenURI]);

  return { image, name };
};

export default useFetchNftDetailsFromTokenURI;
