import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function ImageHelper({
  src,
  alt,
  width,
  height,
  className,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    setLoaded(false);
    setKey((prev) => prev + 1);
  }, [src]);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {!loaded && (
        <div className="absolute z-10 flex w-full items-center justify-center text-white">
          <span className="animate-spin">
            <AiOutlineLoading />
          </span>
        </div>
      )}
      <Image
        key={key}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className ?? ""}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
