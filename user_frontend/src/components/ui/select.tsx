import React, { FC } from "react";

interface SelectProps {
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: { value: number | string; label: string }[];
  disabled?: boolean;
}

export const Select: FC<SelectProps> = ({ value, onChange, placeholder, options, disabled = false }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
