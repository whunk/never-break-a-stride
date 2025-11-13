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
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                {title && <h2 className="modal-title">{title}</h2>}

                <div className="modal-body">{children}</div>
                <IconButton
                    className="modal-close-btn"
                    icon={CrossIcon}
                    onClick={onClose}
                />
            </div>
        </div>
    );
};

export default Modal;