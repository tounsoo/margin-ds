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
                    <svg
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        height="1em"
                        width="1em"
                    >
                            <path d="M10.97 4.97a.75.75 0 011.07 1.05l-3.99 4.99a.75.75 0 01-1.08.02L4.324 8.384a.75.75 0 111.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 01.02-.022z" />
                    </svg>
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
