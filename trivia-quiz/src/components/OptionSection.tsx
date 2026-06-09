import OptionButton from "./OptionButton";
import type { OptionGroupProps } from "../types";

export default function OptionSection({
  title,
  props,
  isSelected,
  onSelect,
}: OptionGroupProps) {
  return (
    <div>
      <h2 className="mt-4 font-bold">{title}</h2>
      <div className="flex flex-row flex-wrap gap-3.5 border-b border-[#2a2c34] py-4">
        {props.map((item) => (
          <OptionButton
            key={item.id}
            props={item}
            onSelect={onSelect}
            isSelected={isSelected}
          />
        ))}
      </div>
    </div>
  );
}
