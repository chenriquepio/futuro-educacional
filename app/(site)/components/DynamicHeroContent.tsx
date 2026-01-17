import Image from "next/image";

type DynamicHeroContentProps = {
  title: string;
  description: string;
  image: string;
  background: string;
  highlights: string[];
};

export default function DynamicHeroContent({
  title,
  description,
  image,
  background,
  highlights,
}: DynamicHeroContentProps) {
  return (
    <section className="py-12 md:py-20 text-white relative overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-500 mt-[-80px]"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="relative pl-0 md:pl-12 order-2 lg:order-1">
            <div className="relative max-w-[320px] md:max-w-[480px] h-[400px] md:h-[600px] mx-auto lg:mx-0">
              <Image
                src={image}
                alt={title}
                fill
                className="object-contain rounded-lg transition-all duration-500"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6">
              {title}
            </h2>
            <p className="text-base md:text-lg text-white/90 font-medium mb-4 md:mb-6 leading-relaxed">
              {description}
            </p>
            <div className="border-t border-[#DEE6F1] my-4"></div>
            <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 text-left">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className="flex items-start md:items-center gap-2"
                >
                  <div className="w-5 h-5 bg-[#FDC938] rounded-full mr-2 flex items-center justify-center shrink-0 mt-0.5 md:mt-0">
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.3594 0.304688C10.6641 0.585938 10.6641 1.07812 10.3594 1.35938L4.35938 7.35938C4.07812 7.66406 3.58594 7.66406 3.30469 7.35938L0.304688 4.35938C0 4.07812 0 3.58594 0.304688 3.30469C0.585938 3 1.07812 3 1.35938 3.30469L3.82031 5.76562L9.30469 0.304688C9.58594 0 10.0781 0 10.3594 0.304688Z"
                        fill="#1C437F"
                      />
                    </svg>
                  </div>
                  <p className="text-white font-medium text-sm md:text-base">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
