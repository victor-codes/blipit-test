export const SetupSection = ({ title, children }: SetupSectionProps) => {
  return (
    <div>
      <h2 className="text-primary text-xl font-medium mb-3">{title}</h2>
      <div className="grid gap-y-6">{children}</div>
    </div>
  );
};

type SetupSectionProps = {
  title: string;
  children: React.ReactNode;
};
