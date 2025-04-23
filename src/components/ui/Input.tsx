import React, { InputHTMLAttributes, ChangeEvent, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge";

const inputVariants = cva(
  "w-full h-[48px] rounded-[4px] border-[2px] border-[--gray-light] text-[--font-default] transition-colors placeholder:text-neutral-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-[--gray-light]",
        error: "border-red-500 focus:ring-red-500",
      },
      size: {
        sm: "px-[10px]",
        md: "px-[10px]",
        lg: "px-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type InputVariants = VariantProps<typeof inputVariants>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof InputVariants> {
  label?: string;
  error?: string;
  variant?: InputVariants["variant"];
  size?: InputVariants["size"];
  onValueChange?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      label,
      error,
      onValueChange,
      onChange,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onValueChange) {
        onValueChange(e.target.value);
      }
    };

    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-[--font-default]">{label}</label>
        )}
        <input
          className={cn(inputVariants({ variant: error ? "error" : variant, size }), className)}
          onChange={handleChange}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
export { inputVariants };
