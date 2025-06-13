import React from "react";
import clsx from "clsx";

const variantMap = {
  title: "text-2xl font-bold leading-tight", // 1.5rem 700
  subtitle: "text-xl font-semibold leading-snug", // 1.25rem 600
  heading: "text-lg font-semibold leading-snug", // 1.125rem 600
  body: "text-base font-normal leading-normal", // 1rem 400
  bodyBold: "text-base font-semibold leading-normal", // 1rem 600
  small: "text-sm font-normal leading-snug", // 0.875rem 400
  smallBold: "text-sm font-semibold leading-snug", // 0.875rem 600
  caption: "text-xs font-normal leading-tight", // 0.75rem 400
  captionBold: "text-xs font-semibold leading-tight", // 0.75rem 600
  blockquote: "mt-6 border-l-2 pl-6 italic text-base",
  ul: "my-6 ml-6 list-disc [&>li]:mt-2",
  ol: "my-6 ml-6 list-decimal [&>li]:mt-2",
  li: "",
};

const defaultElement = {
  title: "h1",
  subtitle: "h2",
  heading: "h3",
  body: "p",
  bodyBold: "p",
  small: "span",
  smallBold: "span",
  caption: "span",
  captionBold: "span",
  blockquote: "blockquote",
  ul: "ul",
  ol: "ol",
  li: "li",
};

export function Typography({ variant = "body", as, className, children, ...props }) {
  const Component = as || defaultElement[variant] || "span";
  return (
    <Component className={clsx(variantMap[variant], className)} {...props}>
      {children}
    </Component>
  );
}
