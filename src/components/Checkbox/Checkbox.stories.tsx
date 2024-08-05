import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { Label } from "../Label";
import { Flexbox } from "../Flexbox";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Component/Checkbox",
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
        value: "test1"
	},
};

export const Controlled: Story = {
	args: {
		checked: false,
		"aria-label": "test2",
        value: "test2"
	},
};

export const Example = {
	render: function Render() {
		return (
				<Checkbox id="test3" value="test3">Hello World</Checkbox>
		);
	},
};

export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
					<Checkbox id="test4" value="test4">Hello World</Checkbox>
			</A11yProvider>
		);
	},
};
