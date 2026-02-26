import { HTMLAttributes, forwardRef } from "react";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "xl";
  background?: "default" | "muted" | "primary";
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className = "",
      spacing = "lg",
      background = "default",
      children,
      ...props
    },
    ref
  ) => {
    const spacings = {
      sm: "py-8",
      md: "py-12",
      lg: "py-16 sm:py-20",
      xl: "py-20 sm:py-28",
    };

    const backgrounds = {
      default: "",
      muted: "bg-muted",
      primary: "bg-primary text-primary-foreground",
    };

    return (
      <section
        ref={ref}
        className={`${spacings[spacing]} ${backgrounds[background]} ${className}`}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
