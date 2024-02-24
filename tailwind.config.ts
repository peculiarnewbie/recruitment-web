import type { Config } from "tailwindcss";

export default {
	darkMode: "selector",
	content: ["./app/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [
		require("@catppuccin/tailwindcss")({
			prefix: "ctp",
			defaultFlavour: "latte",
		}),
	],
} satisfies Config;
