import Image from "next/image";

type ContentSectionProps = {
  section1: {
    title: string;
    description: string;
    image: string;
  };
  section2: {
    title: string;
    description: string;
    image: string;
  };
};

export default function ContentSection({
  section1,
  section2,
}: ContentSectionProps) {
  return (
    <>
      {/* Section 1 */}
      <section className="pt-12 md:pt-20 pb-5 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e3a5f] mb-3 md:mb-4">
                {section1.title}
              </h2>
              <p className="text-base md:text-lg text-[#504E4E] leading-relaxed max-w-[480px] mx-auto lg:mx-0">
                {section1.description}
              </p>
            </div>
            <div className="flex justify-center lg:justify-end mt-6 lg:mt-0">
              <div className="relative max-w-[400px] md:max-w-[560px] w-full">
                {/* 2 bordas decorativas do lado direito - hidden on mobile */}
                <div className="hidden md:block absolute top-0 h-56 right-[28px] w-full rounded-full border-2 border-[#FDC938]"></div>
                <div className="hidden md:block absolute top-0 h-56 right-[14px] w-full rounded-full border-2 border-[#1C437F]"></div>
                <div className="relative w-full h-48 md:h-56 rounded-full overflow-hidden">
                  <Image
                    src={section1.image}
                    alt={section1.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="pt-5 pb-12 md:pb-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="flex justify-center lg:justify-start order-2 lg:order-1 mt-6 lg:mt-0">
              <div className="relative max-w-[400px] md:max-w-[560px] w-full">
                {/* 2 bordas decorativas do lado esquerdo - hidden on mobile */}
                <div className="hidden md:block absolute top-0 left-[28px] w-full h-56 rounded-full border-2 border-[#FDC938]"></div>
                <div className="hidden md:block absolute top-0 left-[14px] w-full h-56 rounded-full border-2 border-[#1C437F]"></div>
                <div className="relative w-full h-48 md:h-56 rounded-full overflow-hidden">
                  <Image
                    src={section2.image}
                    alt={section2.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 ml-0 lg:ml-12 text-center lg:text-left">
              <h2 className="text-2xl md:text-4xl font-extrabold text-[#1e3a5f] mb-3 md:mb-4">
                {section2.title}
              </h2>
              <p className="text-base md:text-lg text-[#504E4E] leading-relaxed">
                {section2.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
