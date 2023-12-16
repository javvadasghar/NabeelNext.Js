import {
  TextInput as FTextInput,
  TextInputProps as FTextInputProps,
} from "flowbite-react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export interface TextInputProps extends FTextInputProps {
  label?: string;
  vertical?: boolean;
  containerClassName?: string;
  labelClassName?: string;
}

const TextInput: FC<TextInputProps> = ({
  label,
  vertical = false,
  containerClassName,
  labelClassName,
  style,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        `flex flex-1 gap-2 ${vertical ? "flex-col" : "flex-row"}`,
        containerClassName
      )}
    >
      <label
        className={twMerge(
          `flex font-bold text-[24px] italic ${
            vertical ? "self-start" : "self-end"
          }`,
          labelClassName
        )}
      >
        {label}
      </label>

      <FTextInput
        style={{
          borderRadius: 0,
          borderWidth: 0,
          ...style,
        }}
        className="w-[300px]"
        {...props}
      />
    </div>
  );
};

export default TextInput;
