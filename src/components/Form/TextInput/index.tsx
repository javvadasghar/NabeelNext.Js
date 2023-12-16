import {
  TextInput as FTextInput,
  TextInputProps as FTextInputProps,
} from "flowbite-react";
import { FC } from "react";

export interface TextInputProps extends FTextInputProps {
  label?: string;
}

const TextInput: FC<TextInputProps> = ({ label, ...props }) => {
  return (
    <div className="flex flex-1 gap-2 ">
      <label className="flex font-bold self-end text-[24px] italic">
        {label}
      </label>

      <FTextInput
        style={{
          borderRadius: 0,
          borderWidth: 0,
        }}
        className="w-full"
        {...props}
      />
    </div>
  );
};

export default TextInput;
