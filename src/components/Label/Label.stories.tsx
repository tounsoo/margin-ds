import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { Checkbox } from "../Checkbox";
import { Flexbox } from "../Flexbox";
import { Input } from "../Input";

const meta = {
	title: "Example/Label",
	component: Label,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCheckbox: Story = {
	render: function Render() {
		return (
			<Flexbox alignItems="start" gap=".5rem">
				<Checkbox id="test" />
				<Label htmlFor="test">Hello World</Label>
			</Flexbox>
		);
	},
};

export const WithInput: Story = {
	render: function Render() {
		return (
			<Flexbox flexDirection="column" alignItems="start">
				<Label htmlFor="test">Hello World</Label>
				<Input id="test" />
			</Flexbox>
		);
	},
};
