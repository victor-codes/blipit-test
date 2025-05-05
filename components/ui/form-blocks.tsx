import React from "react";

type FormBlockProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
};

type FormProps = React.ComponentProps<"form"> & {
  children: React.ReactNode;
};

export const FormWrapper = ({ children, ref }: FormBlockProps) => {
  return (
    <div ref={ref} className="grid gap-y-8">
      {children}
    </div>
  );
};

export const Form = ({ children, ...delegated }: FormProps) => {
  return (
    <form className="grid gap-y-6" {...delegated}>
      {children}
    </form>
  );
};

export const FormHeader = ({ children }: FormBlockProps) => {
  return <div className="grid gap-y-2">{children}</div>;
};

export const FormTitle = ({ children }: FormBlockProps) => {
  return <h3 className="text-xl font-medium">{children}</h3>;
};

export const FormDesc = ({ children }: FormBlockProps) => {
  return <p className="text-accent-foreground">{children}</p>;
};

export const FormColumn = ({ children }: FormBlockProps) => {
  return <div className="relative grid gap-y-2">{children}</div>;
};

export const FormAction = ({ children }: FormBlockProps) => {
  return <div className="flex flex-col pt-4 space-y-4">{children}</div>;
};

export const FormErrorText = ({ children }: FormBlockProps) => {
  return (
    <p className="absolute -bottom-5 leading-none text-sm text-destructive w-full">
      {children}
    </p>
  );
};
