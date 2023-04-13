interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        p-4
        mt-10
        border-neutral-300
        bg-zinc-700
        border-2
        rounded-md
        outline-none
        text-white
        text-xl
        font-600
        focus:border-sky-800
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed

      "
    >
      {title}
    </button>
  );
};

export default Button;
