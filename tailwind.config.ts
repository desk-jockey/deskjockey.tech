// tailwind.config.ts
import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Everforest Dark Hard - Background colors
        bg0: "#272e33", // darkest background
        bg1: "#2e383c", // dark background
        bg2: "#374145", // medium background
        bg3: "#414b50", // light background
        bg4: "#495156", // lighter background
        bg5: "#4f5559", // visual selection

        // Foreground colors
        fg: "#d3c6aa", // main foreground
        red: "#e67e80", // error/red
        orange: "#e69875", // orange
        yellow: "#dbbc7f", // yellow/warning
        green: "#a7c080", // success/green
        aqua: "#83c092", // aqua/cyan
        blue: "#7fbbb3", // info/blue
        purple: "#d699b6", // purple
        grey0: "#7a8478", // comment
        grey1: "#859289", // line number
        grey2: "#9da9a0", // visual
      },
      animation: {
        "pulse-slow": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
} satisfies Config;
