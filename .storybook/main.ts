import type { StorybookConfig } from "storybook-react-rsbuild";

const config: StorybookConfig = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-onboarding",
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@chromatic-com/storybook",
		"@storybook/addon-interactions",
		"@storybook/addon-a11y",
		"@storybook/addon-storysource",
	],
	framework: {
		name: "storybook-react-rsbuild",
		options: {},
	},
	docs: {},
	typescript: {
		reactDocgen: "react-docgen",
		check: true,
	},
	// typescript: {
	// 	reactDocgen: "react-docgen-typescript",
	// 	reactDocgenTypescriptOptions: {
	// 		shouldExtractLiteralValuesFromEnum: true,
	// 		propFilter: (prop) =>
	// 			prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
	// 	},
	// 	check: true,
	// },
};

export default config;
