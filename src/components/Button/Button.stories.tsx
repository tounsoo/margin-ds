import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Spacer } from "../Spacer";
import { useState } from "react";
import { A11yProvider } from "../../providers";

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

const SampleIcon = () => (
	// biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		height="24px"
		viewBox="0 -960 960 960"
		width="24px"
		fill="#5f6368"
	>
		<path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
	</svg>
);

export const WithIcon: Story = {
	args: {
		"aria-label": "Check something",
		children: <SampleIcon />,
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

export const ToggleUncontrolled: Story = {
	render: function Render() {
		return (
			<Button.Toggle aria-label="toggle A" onPressedChange={console.log}>
				Toggle A
			</Button.Toggle>
		);
	},
};

export const ToggleControlled: Story = {
	render: function Render() {
		const [pressed, setPressed] = useState(false);
		return (
			<Button.Toggle
				pressed={pressed}
				onClick={() => setPressed(!pressed)}
				aria-label="toggle A"
				onPressedChange={console.log}
			>
				Toggle A
			</Button.Toggle>
		);
	},
};

export const Grouping: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Button.Group fill>
					<Button>First</Button>
					<Button>Second</Button>
					<Button>Third</Button>
				</Button.Group>
			</div>
		);
	},
};

export const FillInGroup: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Button.Group fill>
					<Button fill>First</Button>
					<Button fill>Second</Button>
					<Button fill>Third</Button>
				</Button.Group>
			</div>
		);
	},
};

export const Spacing: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Button.Group fill>
					<Button>First</Button>
					<Spacer />
					<Button>Second</Button>
					<Button>Third</Button>
				</Button.Group>
			</div>
		);
	},
};

export const AAA: Story = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
				<div style={{ width: 280, border: "1px solid red" }}>
					<Button.Group fill>
						<Button>Default</Button>
						<Button>Small</Button>
					</Button.Group>
				</div>
			</A11yProvider>
		);
	},
};
