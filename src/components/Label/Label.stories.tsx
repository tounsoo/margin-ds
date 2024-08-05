import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { Flexbox } from "../Flexbox";
import { Input } from "../Input";

const meta = {
	title: "Component/Label",
	component: Label,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

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
