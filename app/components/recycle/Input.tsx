interface InputProps {
    placeholder? : string
    value? : string
    type? : string
    disabled? : boolean
    onChange : (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
  }) => {
    return (
      <input
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className="
        w-full
        p-4
        text-lg
        bg-white
        border-neutral-200
        border-2
        rounded-md
        outline-none
        text-black
        focus:border-sky-800
        transition
        disabled:bg-red-900
        disabled:opacity-800
        disabled:cursor-not-allowed

      "
      />
    )
  }
  
  export default Input