"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalSize = "sm" | "default" | "lg" | "xl" | "full";

const modalSizeClass: Record<ModalSize, string> = {
  sm: "sm:max-w-sm",
  default: "sm:max-w-md",
  lg: "sm:max-w-lg",
  xl: "sm:max-w-xl",
  full: "sm:max-w-3xl",
};

/**
 * Modal — semantic alias over Dialog with size variants.
 */
function Modal(props: React.ComponentProps<typeof Dialog>) {
  return <Dialog data-slot="modal" {...props} />;
}

function ModalTrigger(props: React.ComponentProps<typeof DialogTrigger>) {
  return <DialogTrigger data-slot="modal-trigger" {...props} />;
}

function ModalClose(props: React.ComponentProps<typeof DialogClose>) {
  return <DialogClose data-slot="modal-close" {...props} />;
}

function ModalContent({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof DialogContent> & {
  size?: ModalSize;
}) {
  return (
    <DialogContent
      data-slot="modal-content"
      className={cn(modalSizeClass[size], className)}
      {...props}
    />
  );
}

function ModalHeader(props: React.ComponentProps<typeof DialogHeader>) {
  return <DialogHeader data-slot="modal-header" {...props} />;
}

function ModalFooter(props: React.ComponentProps<typeof DialogFooter>) {
  return <DialogFooter data-slot="modal-footer" {...props} />;
}

function ModalTitle(props: React.ComponentProps<typeof DialogTitle>) {
  return <DialogTitle data-slot="modal-title" {...props} />;
}

function ModalDescription(
  props: React.ComponentProps<typeof DialogDescription>,
) {
  return <DialogDescription data-slot="modal-description" {...props} />;
}

export {
  Modal,
  ModalTrigger,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
};
