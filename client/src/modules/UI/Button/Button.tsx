import React from 'react';

export interface ButtonProps {
  height: number;
  width: number;
}

const Button: React.FC<ButtonProps> = () => {
  return (
    <button
      style={{ height: `${50}px`, width: `${100}px` }}
      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-1 px-4 border border-grey-500 rounded"
      type="button"
    >
      Click Me
    </button>
  );
};

export default Button;