import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				"primary": "#009de0",
			}
		}
	},

	plugins: []
} satisfies Config;
