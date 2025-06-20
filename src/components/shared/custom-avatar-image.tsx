"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { addHTTPPrefix } from "@/utils/image-loader";

type Props = {
  src: string;
  alt: string;
  className?: string;
  name?: string;
  imgClassName?: string;
  onClick?: () => void;
  withHttp?: boolean;
};
function CustomAvatarImage({
  alt,
  src,
  className,
  name,
  imgClassName,
  onClick,
  withHttp = true,
}: Props) {
  const [loadingImage, setLoadingImage] = React.useState(true);
  const [error, setError] = React.useState(true);
  return (
    <div
      onClick={onClick}
      className={cn(
        "size-[42px] border-2 flex-shrink-0 relative rounded overflow-hidden",
        className
      )}
    >
      {(error || !src) && (
        <div className="absolute text-xs p-0.5 w-full h-full rounded z-10 inset-0 bg-slate-200 dark:bg-slate-500 flex justify-center items-center uppercase">
          {name
            ? `${name[0]}${name?.split(" ")?.[1]?.[0] ?? name?.at(-1)}`
            : "CB"}
        </div>
      )}
      {!!src && (
        <img
          onError={() => {
            setError(true);
            setLoadingImage(false);
          }}
          sizes="(min-width: 20em) 14vw,
                    (min-width: 14em) 25vw,
                    100vw"
          src={!withHttp ? src : addHTTPPrefix(src)}
          alt={alt}
          className={cn(
            "object-cover object-[top_center] duration-300 ease-in-out ",
            imgClassName,
            loadingImage ? "grayscale blur-2xl" : "grayscale-0 blur-0",
            error ? "opacity-0" : "opacity-100"
          )}
          onLoad={(e) => {
            if (e.currentTarget.complete) {
              setLoadingImage(false);
              setError(false);
            }
          }}
        />
      )}
    </div>
  );
}

export default CustomAvatarImage;
