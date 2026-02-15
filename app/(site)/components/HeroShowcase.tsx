import Image from "next/image";

type HeroShowcaseProps = {
  backgroundImage?: string;
  eyebrow?: string;
  title?: string;
  className?: string;
  imageClassName?: string;
  bottomBlur?: boolean;
  imageMask?: boolean;
};

export default function HeroShowcase({
  backgroundImage,
  eyebrow = "",
  title = "",
  className,
  imageClassName,
  bottomBlur = false,
}: HeroShowcaseProps) {
  return (
    <section
      className={`relative overflow-hidden text-white py-24 min-h-[464px] ${className}`}
    >
      <div className="absolute inset-0">
        {backgroundImage ? (
          <Image
            src={backgroundImage}
            alt={title}
            fill
            className={imageClassName || "object-cover"}
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-[#1C437F]" />
        )}
      </div>
      <div className="absolute inset-0 bg-[#1C437F]/80" />
      {bottomBlur && (
        <div
          className="absolute bottom-0 left-0 right-0 h-22 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(29, 67, 127, 0.95) 0%, rgba(29, 67, 127, 0.7) 25%, rgba(29, 67, 127, 0.4) 50%, rgba(29, 67, 127, 0.15) 75%, rgba(29, 67, 127, 0) 100%)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 75%, rgba(0, 0, 0, 0.85) 85%, rgba(0, 0, 0, 0.6) 92%, rgba(0, 0, 0, 0) 100%)",
            maskImage:
              "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 75%, rgba(0, 0, 0, 0.85) 85%, rgba(0, 0, 0, 0.6) 92%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
      )}
      <div className="container relative mx-auto pt-[114px]">
        <div className="flex flex-col items-center justify-center text-center gap-2">
          <span className="tracking-[4px] text-[36px] text-white font-medium">
            {eyebrow}
          </span>
          <h1 className="text-6xl font-extrabold text-white">{title}</h1>
        </div>
      </div>
    </section>
  );
}
