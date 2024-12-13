import React from "react";

interface InputFieldProps {
  type: string;
  value: string;
  placeholder?: string; // Optional placeholder
  onValueChange: (newValue: string) => void; // Called on input change
  onSubmit?: () => void; // Optional submit handler
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  value,
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
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onValueChange(e.target.value)} // Handle value changes
      onKeyPress={handleKeyPress} // Handle Enter key press
      className="border border-zinc-600 bg-[#1A1C2999] placeholder-gray-300 p-3 rounded-lg w-72 focus:outline-accent"
    />
  );
};

export default InputField;