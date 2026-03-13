type SectionLabelProps = {
  text: string;
};

export const SectionLabel = ({ text }: SectionLabelProps) => {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-8 bg-(--fourth-color)" />
      <span className="text-xs tracking-[0.2em] uppercase text-(--fourth-color)">
        {text}
      </span>
    </div>
  );
};
