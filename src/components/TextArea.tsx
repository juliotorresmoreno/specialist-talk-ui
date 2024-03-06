const defaultClassName =
  "shadow-sm w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500";

type TextAreaProps = {} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea {...props} className={[defaultClassName, className].join(" ")} />
  );
}
