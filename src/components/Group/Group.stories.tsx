import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Group } from "./Group";

const meta = {
	title: "Example/Group",
	component: Group,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Group>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Group style={{ background: "#00cc0048"}} gap=".5rem">
                    <Button fill>First</Button>
                    <Button fill>Second</Button>
                    <Button fill>Third</Button>
                </Group>
			</div>
		);
	},
};

export const Fill: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Group fill style={{ background: "#00cc0048"}} gap=".5rem">
                    <Button fill>First</Button>
                    <Button fill>Second</Button>
                    <Button fill>Third</Button>
                </Group>
			</div>
		);
	},
};
