import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";

const meta = {
	title: "Example/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: "Button",
	},
};

export const Test: Story = {
    render: function Render() {
        return <Button >test</Button>
    }
}