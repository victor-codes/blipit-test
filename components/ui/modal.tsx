"use client";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

// Shared types
interface BaseProps {
  children: React.ReactNode;
}

interface ModalContentProps extends BaseProps {
  title?: string;
  desc?: string;
  className?: string;
}

type MdlWSingleInptCntProps = {
  title: string;
  children: React.ReactNode;
};

const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

export const MdlWSingleInptCnt = ({
  title,
  children,
}: MdlWSingleInptCntProps) => {
  return (
    <ModalContent title={title}>
      <div className="flex flex-col justify-between !h-[35dvh] md:!h-[240px]">
        {children}
      </div>
    </ModalContent>
  );
};

export const Modal: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicSheet = isDesktop ? Dialog : Drawer;

  return <DynamicSheet>{children}</DynamicSheet>;
};

/// is this performant?
type ModalTriggerProps = {
  children: React.ReactNode;
};

export const ModalHeader: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicHeader = isDesktop ? DialogHeader : DrawerHeader;

  return <DynamicHeader>{children}</DynamicHeader>;
};

export const ModalTitle: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicTitle = isDesktop ? DialogTitle : DrawerTitle;

  return <DynamicTitle>{children}</DynamicTitle>;
};

export const ModalDescription: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicDescription = isDesktop ? DialogDescription : DrawerDescription;
  return <DynamicDescription>{children}</DynamicDescription>;
};

export const ModalTrigger: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicTrigger = isDesktop ? DialogTrigger : DrawerTrigger;
  return <DynamicTrigger asChild>{children}</DynamicTrigger>;
};

export const ModalContent: React.FC<ModalContentProps> = ({
  children,
  title,
  className,
  desc,
}) => {
  const isDesktop = useIsDesktop();
  const DynamicContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <DynamicContent className={className}>
      {(title || desc) && (
        <ModalHeader>
          {title && <ModalTitle>{title}</ModalTitle>}
          {desc && <ModalDescription>{desc}</ModalDescription>}
        </ModalHeader>
      )}
      {children}
    </DynamicContent>
  );
};

export const ModalFooter: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicFooter = isDesktop ? DialogFooter : DrawerFooter;

  return <DynamicFooter>{children}</DynamicFooter>;
};
