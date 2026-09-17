import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-3xl px-6", className)} {...props} />;
}

export function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn("scroll-mt-20 border-t border-border py-16 sm:py-20", className)}
    >
      <Container>
        <h2
          id={`${id}-heading`}
          className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}
