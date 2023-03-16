import { type ReactFC } from '@/types';
import React from 'react';
import ReactDOM from 'react-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
export const Modal: ReactFC<{ title?: string; onClose: Function }> = ({
  children,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose = () => {},
}) =>
  ReactDOM.createPortal(
    <div className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative flex  min-h-[300px] min-w-[500px]  items-center justify-center  rounded-lg bg-white px-10 py-5">
        <button
          onClick={(e) => onClose(e)}
          className="absolute right-0 top-0 h-10 w-10 rotate-45 text-3xl text-gray-700"
        >
          +
        </button>
        <div className="max-h-[90vh] w-full max-w-[90vw] overflow-auto">{children}</div>
      </div>
    </div>,
    document.querySelector('body') as HTMLElement
  );
