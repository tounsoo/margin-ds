import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label";
import { Flexbox } from "../Flexbox";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Example/Checkbox",
	component: Checkbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultChecked: false,
		"aria-label": "test1",
	},
};

export const Controlled: Story = {
	args: {
		checked: false,
		"aria-label": "test2",
	},
};

export const Example = {
	render: function Render() {
		return (
			<Flexbox gap=".25rem">
				<Checkbox id="test3" />
				<Label htmlFor="test3">Hello World</Label>
			</Flexbox>
		);
	},
};

export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
				<Flexbox alignItems="center">
					<Checkbox id="test3" />
					<Label htmlFor="test3">Hello World</Label>
				</Flexbox>
			</A11yProvider>
		);
	},
};
