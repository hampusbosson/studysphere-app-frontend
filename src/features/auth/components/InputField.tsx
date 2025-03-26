import React from "react";

interface InputFieldProps {
  type: string;
  value: string;
  label?: string;
  placeholder?: string; // Optional placeholder
  onValueChange: (newValue: string) => void; // Called on input change
  onSubmit?: () => void; // Optional submit handler
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
  label,
  placeholder,
  onValueChange,
  onSubmit,
}) => {
  // Handle key press events (e.g., Enter)
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (onSubmit && event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-gray-300 font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onValueChange(e.target.value)} // Handle value changes
        onKeyPress={handleKeyPress} // Handle Enter key press
        className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-400 p-3 rounded-lg w-72 focus:outline-accent"
      />
    </div>
  );
};

export default InputField;