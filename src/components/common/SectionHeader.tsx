import { SectionLabel } from '@components/common/SectionLabel';

type SectionHeaderProps = {
  label: string;
  title: string;
  highlight: string;
};

export const SectionHeader = ({
  label,
  title,
  highlight,
}: SectionHeaderProps) => {
  return (
    <>
      <SectionLabel text={label} />
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        {title}{' '}
        <span className="italic text-(--fourth-color)">{highlight}</span>
      </h2>
    </>
  );
};
