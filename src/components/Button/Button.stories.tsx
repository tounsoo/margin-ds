import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button";
import { Spacer } from "../Spacer";

const meta = {
	title: "Example/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
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

export const Group: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Button.Group>
                    <Button>First</Button>
                    <Button>Second</Button>
                    <Button>Third</Button>
                </Button.Group>
			</div>
		);
	},
};

export const Spacing: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Button.Group>
                    <Button>First</Button>
                    <Spacer />
                    <Button>Second</Button>
                    <Button>Third</Button>
                </Button.Group>
			</div>
		);
	},
};
