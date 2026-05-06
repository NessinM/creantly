import { cn } from "@creantly/ui/lib/utils";
import type { JSX } from "react";

function FieldGrid({
  className,
  ...props
}: React.ComponentProps<"div">): JSX.Element {
  return (
    <div
      className={cn("grid grid-cols-1 gap-6 md:grid-cols-2", className)}
      {...props}
    />
  );
}

function FieldGridRow({
  className,
  ...props
}: React.ComponentProps<"div">): JSX.Element {
  return <div className={cn("col-span-full", className)} {...props} />;
}

export { FieldGrid, FieldGridRow };
