const SectionTitle = ({
  eyebrow = "",
  title,
  description = "",
  centered = true,
}) => {
  return (
    <div
      className={`mb-12 ${
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl text-left"
      }`}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
          {eyebrow}
        </p>
      )}

      {/* Main title */}
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
        {title}
      </h2>

      {/* Decorative line */}
      <div
        className={`mt-5 flex items-center gap-2 ${
          centered ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-1 w-10 rounded-full bg-blue-600 dark:bg-blue-400" />
        <span className="h-1 w-2 rounded-full bg-blue-300 dark:bg-blue-700" />
      </div>

      {/* Description */}
      {description && (
        <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;