import React from "react";
import { IconButton } from '@/Components';
import { CrossIcon } from '@/Svg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 w-full h-full bg-black/60 flex items-center justify-center z-[1000] animate-fadeIn">
            <div
                className="bg-white rounded-xl w-[90%] max-w-[420px] p-8 relative shadow-[0_10px_25px_rgba(0,0,0,0.3)] animate-slideUp text-[#555]"
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className="mb-4 text-2xl text-center">{title}</h2>}

                <div className="modal-body">{children}</div>
                <IconButton
                    className="absolute top-3 right-3 text-xl hover:text-black cursor-pointer"
                    icon={CrossIcon}
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Modal;