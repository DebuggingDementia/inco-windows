import { useEffect, useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

type Props = {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
};

export default function ImageWithSkeleton({
  src,
  alt,
  className = '',
  containerClassName = '',
  loading = 'lazy',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {src && !loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.06]" />
      )}

      {src && !failed ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`
            ${className}
            transition-opacity duration-500
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-muted">
          <ImageIcon className="mb-2" />

          <span className="text-sm">
            Image to be added
          </span>
        </div>
      )}
    </div>
  );
}