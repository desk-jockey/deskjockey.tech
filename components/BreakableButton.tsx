import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

export interface BreakableButtonProps {
  id?: string;
  onClick?: () => void;
  children?: ComponentChildren;
  disabled?: boolean;
}

const handleClick: () => void = () => {};

export function Button(props: BreakableButtonProps) {
  const [doubleClick, setDoubleClick] = useState(false);
  return (
    <button
      {...props}
      type="button"
      onClick={handleClick}
      class={`px-8 py-4 text-xl font-bold rounded-lg transition-all transform border-none
            ${
        doubleClick
          ? "bg-red-900 scale-110 rotate-2"
          : "bg-[#a7c080] hover:scale-105"
      }
            ${loading ? "opacity-50 cursor-wait" : "cursor-pointer"}
            text-bg-dark`}
    >
      {loading ? "Processing..." : `Clicked ${clicks} times`}
    </button>
  );
}
