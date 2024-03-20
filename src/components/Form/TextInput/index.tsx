import { cn } from "@/utils/tailwindMerge";
import {
  TextInput as FTextInput,
  TextInputProps as FTextInputProps,
} from "flowbite-react";
import { FC } from "react";

export interface TextInputProps extends FTextInputProps {
  label?: string;
  containerClassName?: string;
  labelClassName?: string;
  error?: string;
}

const TextInput: FC<TextInputProps> = ({
  id,
  label,
  containerClassName,
  labelClassName,
  className,
  error,
  style,
  ...props
}) => {
  return (
    <div className={cn(containerClassName)}>
      <div className="flex flex-1 gap-2">
        <label
          className={cn("flex font-bold text-[24px] italic", labelClassName)}
          htmlFor={id}
        >
          {label}
        </label>

        <FTextInput
          style={{
            borderRadius: 0,
            borderWidth: 0,
            ...style,
          }}
          className={cn("w-[300px]", className)}
          id={id}
          name={id}
          {...props}
        />
      </div>
      {Boolean(error) && <div className="text-red-500 mt-1">{error}</div>}
    </div>
  );
};

export default TextInput;
