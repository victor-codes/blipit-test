"use client";
import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
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

const useIsDesktop = () => useMediaQuery("(min-width: 768px)");

export const Modal: React.FC<BaseProps> = ({ children }) => {
  const isDesktop = useIsDesktop();
  const DynamicSheet = isDesktop ? Dialog : Drawer;

  return <DynamicSheet>{children}</DynamicSheet>;
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

// export const ModalFooter: React.FC<BaseProps> = ({ children }) => {
//   const isDesktop = useIsDesktop();
//   const DynamicFooter = isDesktop ? DialogFooter : DrawerFooter;

//   return <DynamicFooter>{children}</DynamicFooter>;
// };
