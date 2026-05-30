export default function Dice(props) {
  return (
    <button
      onClick={() => props.hold(props.id)}
      className={`h-20 w-20 cursor-pointer rounded-[10px] ${props.isHeld ? "bg-[#59E391]" : "bg-white"} text-3xl font-bold shadow-[0px_2px_2px_rgba(0,0,0,0.15)]`}
    >
      {props.value}
    </button>
  );
}
