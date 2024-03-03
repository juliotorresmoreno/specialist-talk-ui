const defaultClassName =
  "shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500";

type InputProps = {} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input {...props} className={[defaultClassName, className].join(" ")} />
  );
}
