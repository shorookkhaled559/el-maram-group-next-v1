interface PageHeaderProps {
  eyebrow: string;
  heading: string;
  subheading: string;
}

export function PageHeader({ eyebrow, heading, subheading }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-40 dark:opacity-25 animate-grid-scroll"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M0 0h1v40H0zM0 0h40v1H0z' fill='%23d4af37' fill-opacity='0.2'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(ellipse 120% 100% at 50% 50%, black 20%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 100% at 50% 50%, black 20%, transparent 80%)",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 text-4xl lg:text-6xl">{heading}</h1>
        <p className="mt-5 max-w-xl text-sm leading-loose text-muted-foreground">
          {subheading}
        </p>
      </div>
    </div>
  );
}
