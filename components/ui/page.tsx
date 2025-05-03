export const PageHeader = ({ children }: React.ComponentProps<"button">) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">{children}</h1>
    </div>
  );
};

export const PageWrapper = ({ children }: React.ComponentProps<"button">) => {
  return <div className="flex flex-col space-y-6 h-full ">{children}</div>;
};
