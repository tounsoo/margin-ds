import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Button } from "../Button";
import { Group } from "../Group";
// import { Spacer } from "../Spacer";

const meta = {
	title: "Example/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: "test",
        "aria-label": "Test Input"
	},
};

export const WithButton: Story = {
	render: function Render() {
		return (
			<Group>
                <Input aria-label="Test Input 2" />
                <Button>Action</Button>
			</Group>
		);
	},
};