"use client";

import { AiOutlineClose } from "react-icons/ai";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, title, body, footer, disabled }) => {
  
  if (!isOpen) {
    return null;
  }
  
  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-x-hidden 
          overflow-y-auto 
          fixed 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800
          bg-opacity-70
        "
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          <div className="
            h-full
            lg:h-auto
            border-0 
            rounded-lg 
            shadow-lg 
            relative 
            flex 
            flex-col 
            w-full 
            bg-white 
            outline-none 
            focus:outline-none
            "
          >
            <div className="
              flex 
              items-center 
              justify-between 
              p-10
              pb-2 
              rounded-t
              "
            >
              <h3 className="text-3xl font-semibold text-black">
                {title}
              </h3>
              <button
                className="
                  p-1 
                  ml-auto
                  border-0 
                  text-black 
                  hover:opacity-70
                  transition
                "
                onClick={onClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            <div className="relative p-10 flex-auto">
              {body}
            </div>
            <div className="flex flex-col gap-2 p-4">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;