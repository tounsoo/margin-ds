import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Group } from "../Group";
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

export const Fill: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
                <Button fill>First</Button>
			</div>
		);
	},
};

export const FillGroup: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Group fill>
                    <Button fill>First</Button>
                    <Button fill>Second</Button>
                    <Button fill>Third</Button>
                </Group>
			</div>
		);
	},
};

export const Grouping: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Group fill>
                    <Button>First</Button>
                    <Button>Second</Button>
                    <Button>Third</Button>
                </Group>
			</div>
		);
	},
};

export const Spacing: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Group fill>
                    <Button>First</Button>
                    <Spacer />
                    <Button>Second</Button>
                    <Button>Third</Button>
                </Group>
			</div>
		);
	},
};
