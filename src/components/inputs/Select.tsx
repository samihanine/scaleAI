type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { label: string; value: string | number | readonly string[] }[];
  className?: string;
};

export const Select = ({ label, options, className, ...props }: SelectProps) => {
  label = label || props.value?.toString() || '';

  return (
    <div className={`space-y-1 ${className || ''}`}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
          className || ''
        }}`}
        {...props}
      >
        {options.map(({ label, value }) => (
          <option key={label} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
