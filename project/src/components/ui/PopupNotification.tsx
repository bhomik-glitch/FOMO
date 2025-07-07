import React from 'react';

interface PopupNotificationProps {
  message: string;
  visible: boolean;
}

const PopupNotification: React.FC<PopupNotificationProps> = ({ message, visible }) => {
  return (
    <div
      className={`fixed top-28 left-8 z-[60] transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'} bg-white shadow-xl rounded-xl px-6 py-4 flex items-center gap-3 border border-gray-200`}
      style={{ minWidth: 260 }}
    >
      <span className="text-green-600 font-bold text-lg">✔</span>
      <span className="text-black font-medium">{message}</span>
    </div>
  );
};

export default PopupNotification; 