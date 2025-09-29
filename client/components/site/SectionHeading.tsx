type Props = { title: string; subtitle?: string; align?: "left" | "center" };
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: Props) {
  return (
    <div
      className={"mb-8 " + (align === "center" ? "text-center" : "text-left")}
    >
      {subtitle && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary/80">
          {subtitle}
        </p>
      )}
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-slate-900">
        {title}
      </h2>
    </div>
  );
}
