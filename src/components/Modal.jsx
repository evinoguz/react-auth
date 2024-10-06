import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

import modals from "../modals";
import { modalClose } from "../utils";

const Modal = ({ name, data }) => {
  const currentModal = modals.find((m) => m.name === name);
  const [isOpen, setIsOpen] = useState(true);
  
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(modalClose, 200);
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel
            transition
            className="max-w-lg space-y-4 bg-white p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <currentModal.element closeModal={closeModal} data={data} />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
