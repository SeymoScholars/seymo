import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchSiteImages } from '../services/imageService';

interface ImageContextType {
  images: any;
  loading: boolean;
  getImage: (path: string, fallback: string) => string;
}

const ImageContext = createContext<ImageContextType>({
  images: null,
  loading: true,
  getImage: (_, fallback) => fallback
});

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [images, setImages] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchSiteImages();
      setImages(data);
      setLoading(false);
    }
    load();
  }, []);

  const getImage = (path: string, fallback: string) => {
    if (!images) return fallback;
    const parts = path.split('.');
    let current = images;
    for (const part of parts) {
      if (current === undefined || current === null) return fallback;
      current = current[part];
    }
    return typeof current === 'string' ? current : fallback;
  };

  return (
    <ImageContext.Provider value={{ images, loading, getImage }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => useContext(ImageContext);
