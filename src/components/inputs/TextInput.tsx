import { type ReactFC } from '@/types';
import { useState } from 'react';

type TextInputProps = {
  label?: string;
  name: string;
  prefix?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextInput: ReactFC<TextInputProps> = ({ prefix, name = '', required, ...props }) => {
  const label = props.label || name.replaceAll('_', ' ');
  const [focused, setFocused] = useState(false);

  return (
    <>
      <label
        htmlFor={label}
        className={`left-1 font-semibold capitalize leading-none ${
          focused && 'text-primary'
        } transition-all duration-200`}
      >
        {label} {required && '*'}
      </label>
      <div
        className={`relative border-2 ${
          focused && 'border-primary'
        } flex items-stretch rounded-md transition-all duration-200`}
      >
        {prefix && (
          <div
            className={`flex items-center justify-center rounded-l-sm p-2 font-semibold text-white ${
              (focused && 'bg-primary') || 'bg-gray-400'
            } transition-all duration-200`}
          >
            {prefix}
          </div>
        )}
        <input
          id={label}
          className="w-full rounded-md p-2 outline-none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          required={required}
          name={name}
          {...props}
        />
      </div>
    </>
  );
};
