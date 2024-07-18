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

export const WithIcon: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
                <Button>
                    {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                </Button>
			</div>
		);
	},
};

export const Fill: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
                <Button fill>
                    First
                </Button>
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
