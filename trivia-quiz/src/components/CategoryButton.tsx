import type { ButtonProps } from "../types";

export default function CategoryButton({ props, onSelect }: ButtonProps) {
  return (
    <>
      <div>
        <button onClick={() => onSelect(props.value, props.option)}>
          {props.label}
        </button>
      </div>
    </>
  );
}
