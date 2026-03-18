import React from 'react';

type ModalProps = {
    children: React.ReactNode;
    onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* MODAL CONTENT */}
            <div className="relative z-10 w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 animate-fadeIn">

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                    ✕
                </button>

                {children}
            </div>
        </div>
    );
}

export default Modal;