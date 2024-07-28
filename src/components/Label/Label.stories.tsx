import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { Checkbox } from "../Checkbox";
import { Flex } from "../Flex";
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
			<Flex alignItems="start" gap=".5rem">
				<Checkbox id="test" />
				<Label htmlFor="test">Hello World</Label>
			</Flex>
		);
	},
};

export const WithInput: Story = {
	render: function Render() {
		return (
			<Flex direction="column" alignItems="start">
				<Label htmlFor="test">Hello World</Label>
				<Input id="test" />
			</Flex>
		);
	},
};
