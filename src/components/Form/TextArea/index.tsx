import { cn } from "@/utils/tailwindMerge";
import { Textarea, TextareaProps } from "flowbite-react";
import { FC } from "react";

export interface TextAreaProps extends TextareaProps {
  label?: string;
  vertical?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const TextArea: FC<TextAreaProps> = ({
  vertical,
  containerClassName,
  labelClassName,
  label,
  style,
  ...props
}) => {
  return (
    <div
      className={cn(
        `flex flex-1 gap-2 ${vertical ? "flex-col" : "flex-row"}`,
        containerClassName
      )}
    >
      <label
        className={cn(
          `flex font-bold text-[24px] italic ${
            vertical ? "self-start" : "self-end"
          }`,
          labelClassName
        )}
      >
        {label}
      </label>
      <Textarea
        style={{
          borderRadius: 0,
          borderWidth: 0,
          height: "100px",
          ...style,
        }}
        {...props}
      />
    </div>
  );
};

export default TextArea;
