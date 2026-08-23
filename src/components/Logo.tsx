import React, { useState } from 'react';
import { useImage } from '../hooks/useImage';

export default function Logo({ className = "w-40 h-auto", isDarkText = true }: { className?: string; isDarkText?: boolean }) {
  const [error, setError] = useState(false);
  const { getImage } = useImage();

  const textColor = isDarkText ? "text-indigo-950" : "text-white";

  if (error) {
    return (
      <div className={`font-black text-2xl tracking-tighter ${textColor} ${className} flex items-center`}>
        <span className="text-green-500 mr-1">●</span> Seymo Scholars
      </div>
    );
  }

  return (
    <img 
      src={getImage('logo', '/logo.png')} 
      alt="Seymo Scholars Logo" 
      className={className} 
      onError={() => {
        setError(true);
      }}
    />
  );
}
