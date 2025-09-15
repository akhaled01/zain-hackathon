import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const customBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        technical:
          "bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/30",
        "non-technical":
          "bg-purple-100 text-purple-800 border border-purple-200 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/30",
        default:
          "bg-gray-100 text-gray-800 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800/20 dark:text-gray-400 dark:border-gray-700/30",
        success:
          "bg-green-100 text-green-800 border border-green-200 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/30",
        warning:
          "bg-yellow-100 text-yellow-800 border border-yellow-200 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800/30",
        info: "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/30",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        default: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface CustomBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof customBadgeVariants> {
  baseColor?: string;
}

export const CustomBadge = React.forwardRef<HTMLSpanElement, CustomBadgeProps>(
  ({ className, variant, size, baseColor, style, ...props }, ref) => {
    // If baseColor is provided, create custom styles
    const customStyles = baseColor
      ? {
          backgroundColor: `${baseColor}20`,
          color: baseColor,
          borderColor: `${baseColor}40`,
          ...style,
        }
      : style;

    return (
      <span
        ref={ref}
        className={cn(customBadgeVariants({ variant, size }), className)}
        style={customStyles}
        {...props}
      />
    );
  }
);

CustomBadge.displayName = "CustomBadge";
