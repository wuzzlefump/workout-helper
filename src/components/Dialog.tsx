"use-client";
import * as React from "react";
import { Dialog, DialogPanel } from "@headlessui/react";

interface Props {
  header?: React.ReactNode;
  children: React.ReactNode;
  onDismiss?: () => void;
  isOpen: boolean;
}

export function MyDialog({ children, header, isOpen, onDismiss }: Props) {
  return (
    <Dialog
      className={"relative z-50"}
      open={isOpen}
      onClose={() => (onDismiss ? onDismiss() : null)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true">
        <div className="fixed inset-0 overflow-y-auto">
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className={"p-5 max-w-xl rounded bg-white"}>
              <div className="font-semibold pb-2">{header}</div>
              <div className="max-h-[350px] overflow-y-auto md:max-h-[600px]">
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
