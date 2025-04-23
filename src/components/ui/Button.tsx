"use client";
import { ButtonHTMLAttributes, useState, useCallback } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  className = "",
  variant = "primary",
  size = "md",
  isLoading = false,
  fullWidth = false,
  disabled,
  onClick,
  ...props
}: ButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!onClick) return;
      if (disabled || isLoading) return;

      setIsActive((prev) => !prev);
      onClick(e);
    },
    [onClick, disabled, isLoading],
  );

  const baseStyles =
    "inline-flex items-center h-[52px] rounded-[8px] text-[16px] font-medium transition-all duration-200 disabled:bg-[#A5ADBA] disabled:cursor-not-allowed disabled:text-white";

  const getOutlineStyles = () => {
    if (!onClick) {
      return "border border-[#DFE1E6] bg-white text-gray-700";
    }
    return `group border border-[#DFE1E6] bg-white text-gray-700 hover:bg-[#F8F9FD] focus:ring-primary/50
      ${isActive ? "bg-[#F8F9FD] border-primary text-primary [&>*]:text-primary [&_svg]:text-primary" : ""}`;
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary/50",
    secondary: "bg-secondary text-white hover:bg-secondary/90 focus:ring-secondary/50",
    outline: getOutlineStyles(),
  };

  const sizes = {
    sm: "px-4",
    md: "px-6",
    lg: "px-8",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        isLoading ? "cursor-not-allowed opacity-70" : ""
      } ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={isLoading || disabled}
      onClick={onClick ? handleClick : undefined}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
