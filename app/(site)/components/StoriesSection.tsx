import React from "react";
import Image from "next/image";

type Story = {
  title: string;
  image: string;
  creator: string;
  cargo: string;
  data: string;
};

type StoriesSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  stories: Story[];
  creatorLabel?: string;
};

export default function StoriesSection({
  eyebrow,
  title,
  description,
  stories,
  creatorLabel = "Criador:",
}: StoriesSectionProps) {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/BACKGROUND-story.png')",
        backgroundSize: "100% 200%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-12">
          <span className="text-sm font-semibold text-blue-600 uppercase">
            {eyebrow}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a5f] mt-2 mb-2">
            {title}
          </h2>
          <p className="text-lg text-[#585858] max-w-3xl">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-lg w-full shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="h-72 bg-gray-300 relative overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="px-6 pt-4 flex justify-between items-center">
                <div
                  className="inline-block mb-2 rounded-full"
                  style={{
                    border: "1px solid #EAF3F8",
                    padding: "8px 16px",
                    fontFamily: "var(--font-poppins)",
                  }}
                >
                  <span className="text-[#1C437F] font-medium">
                    {story.cargo}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{story.data}</p>
              </div>
              <div className="p-6 pt-0 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-[#1e3a5f] mb-4 flex-1">
                  {story.title}
                </h3>
                {/* Divisor e Creator - sempre no final */}
                <div className="mt-auto">
                  {/* Divisor */}
                  <div className="h-px bg-[#1C437F] mb-4"></div>
                  {/* Creator info */}
                  <div className="flex items-center gap-3">
                    <div className="relative w-[42px] h-[42px] rounded-full overflow-hidden bg-gray-200">
                      <Image
                        src={story.image}
                        alt={story.creator}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span
                          className="text-sm font-semibold"
                          style={{ fontFamily: "var(--font-poppins)" }}
                        >
                          {creatorLabel}
                        </span>
                        <p className="text-sm text-[#445375]">{story.creator}</p>
                      </div>

                      <a
                        href="#"
                        className="text-[#1e3a5f] hover:opacity-80 flex items-center justify-center"
                        style={{
                          width: "44px",
                          height: "44px",
                          borderRadius: "5px",
                          background: "#EBF5FF",
                          padding: "10px",
                        }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
