import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from "@rsbuild/plugin-sass";
import { pluginLightningcss } from "@rsbuild/plugin-lightningcss";

export default defineConfig({
	plugins: [pluginReact(), pluginSass(), pluginLightningcss()],
	source: {
		alias: {
			"@tokens": "./src/tokens",
		},
	},
});
