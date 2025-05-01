import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { JSX } from "react";

export const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  return (
    <div>
      <h2 className="text-primary font-medium mb-3">{title}</h2>
      <div className="border rounded-t-xl rounded-b-xl [&>*:not(:first-child)]:border-t shadow-sm">
        {children}
      </div>
    </div>
  );
};

export const SettingsItem = ({
  title,
  desc,
  showArrow = true,
  icon,
  value,
}: SettingsItemProps) => {
  return (
    <div
      className={cn(
        "flex justify-between min-h-[3rem] items-center p-4 gap-x-3  "
      )}
    >
      <div className="flex items-center gap-x-2 ">
        {icon && <div className="w-6 h-6">{icon}</div>}
        <div className="space-y-0.5">
          <h3 className="leading-none w-max text-secondary-foreground">
            {title}
          </h3>
          {desc && <p className="text-accent-foreground text-sm">{desc}</p>}
        </div>
      </div>

      <div className="flex truncate items-center gap-0.5">
        <span className="text-primary truncate font-medium">{value}</span>
        {showArrow && (
          <span>
            <ChevronRight />
          </span>
        )}
      </div>
    </div>
  );
};

export type SettingsSectionProps = {
  title: string;
  children: React.ReactNode;
};

export type SettingsItemProps = {
  title: string;
  desc?: string;
  value?: string;
  showArrow?: boolean;
  icon?: JSX.Element;
};
