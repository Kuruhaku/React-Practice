import type { ButtonProps } from "../types";

export default function OptionButton({
  props,
  onSelect,
  isSelected,
}: ButtonProps) {
  return (
    <>
      <button
        onClick={() => onSelect(props.value, props.option)}
        className={`rounded-xl border p-3 text-xs ${props.value === isSelected[props.option] ? "bg-[#855bfb29] text-[#7132f5]" : "border-[#2a2c34]"}`}
      >
        {props.label}
      </button>
    </>
  );
}
