import { useState, useEffect } from "react";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface CustomImageProps extends React.ComponentProps<typeof NextImage> {
  fallback?: React.ReactNode;
  showSpinnerOnOriginMismatch?: boolean;
}

export function CustomImage({
  src,
  className,
  fallback,
  showSpinnerOnOriginMismatch = true,
  ...props
}: CustomImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [originMismatch, setOriginMismatch] = useState(false);

  useEffect(() => {
    if (!src) {
      setError(true);
      return;
    }

    try {
      const url = new URL(src.toString());
      const currentOrigin = window.location.origin;
      setOriginMismatch(url.origin !== currentOrigin);
    } catch {
      // Invalid URL, treat as error
      setError(true);
    }
  }, [src]);

  if (error) {
    if (fallback) {
      return <>{fallback}</>;
    }
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gray-100",
          "relative overflow-hidden",
          className
        )}
        style={{ width: props.width, height: props.height }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex h-1/2 w-1/2 items-center justify-center rounded-full bg-gray-200">
            <svg
              className="h-1/2 w-1/2 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (originMismatch && showSpinnerOnOriginMismatch) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <NextImage
      src={src}
      className={cn("transition-opacity duration-300", isLoading && "opacity-0", className)}
      onLoadingComplete={() => setIsLoading(false)}
      onError={() => setError(true)}
      {...props}
    />
  );
}
