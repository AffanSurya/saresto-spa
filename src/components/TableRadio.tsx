import { Label, Radio } from "flowbite-react";
import React from "react";

interface TableRadioProps {
  id: string;
  name: string;
  value: string;
  labelText: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export const TableRadioComponent: React.FC<TableRadioProps> = ({
  id,
  name,
  value,
  labelText,
  onChange,
  checked,
}) => {
  return (
    <div className="">
      <Radio
        id={id}
        name={name}
        value={value}
        className="peer hidden"
        onChange={onChange}
        checked={checked}
      />
      <Label
        htmlFor={id}
        className="inline-flex w-12 cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-600 peer-checked:border-blue-600 peer-checked:text-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300 dark:peer-checked:text-blue-500 sm:p-5 sm:text-base md:w-14 "
      >
        <div className="w-full text-lg font-semibold">{labelText}</div>
      </Label>
    </div>
  );
};
