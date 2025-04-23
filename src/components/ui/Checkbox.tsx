import React, { InputHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/twMerge";

const checkboxVariants = cva(
  "text-primary focus:ring-primary mr-[4px] h-3 w-3 rounded-[4px] border border-[--checkbox-border] bg-[--checkbox-bg] p-[6px] text-[10px]",
  {
    variants: {
      variant: {
        default: "border-[--checkbox-border]",
        error: "border-red-500",
      },
      size: {
        sm: "h-2 w-2",
        md: "h-3 w-3",
        lg: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

type CheckboxVariants = VariantProps<typeof checkboxVariants>;

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, keyof CheckboxVariants> {
  label?: string;
  error?: string;
  variant?: CheckboxVariants["variant"];
  size?: CheckboxVariants["size"];
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, variant, size, label, error, onCheckedChange, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (onCheckedChange) {
        onCheckedChange(e.target.checked);
      }
    };

    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          className={cn(checkboxVariants({ variant: error ? "error" : variant, size }), className)}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
        {label && <span className="text-[10px] text-[--font-dark]">{label}</span>}
        {error && <p className="ml-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
export { checkboxVariants };
