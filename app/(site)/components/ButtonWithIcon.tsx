import React from "react";

interface ButtonWithIconProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function ButtonWithIcon({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
  icon = (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M1 1.00002L13 1M13 1L13 13M13 1L1.00002 13"
        stroke="#001F63"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
}: ButtonWithIconProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-transparent text-[#001F63] cursor-pointer border border-[#FDC938] rounded-full font-semibold transition-all duration-300 flex items-center gap-2 justify-center ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      style={{ padding: "3px" }}
    >
      <span className="bg-[#FDC938] rounded-full px-6 py-2 flex items-center gap-4">
        {children}
        {icon}
      </span>
    </button>
  );
}
