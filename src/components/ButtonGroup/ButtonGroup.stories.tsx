import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button/Button";

const meta = {
	title: "Example/ButtonGroup",
	component: ButtonGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: (
			<>
				<Button>First</Button>
				<Button>Second</Button>
			</>
		),
	},
};

export const Spacing: Story = {
	args: {
		children: (
			<>
				<Button>First</Button>
				<ButtonGroup.Spacer />
				<Button>Second</Button>
				<Button>Third</Button>
			</>
		),
	},
	render: function Render(args) {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<ButtonGroup>{args.children}</ButtonGroup>
			</div>
		);
	},
};

export const Positioning: Story = {
	args: {
		children: (
			<>
				<Button>First</Button>
				<Button>Second</Button>
			</>
		),
	},
	render: function Render(args) {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<ButtonGroup>{args.children}</ButtonGroup>
				<ButtonGroup justifyContent="end">{args.children}</ButtonGroup>
				<ButtonGroup justifyContent="center">
					{args.children}
				</ButtonGroup>
			</div>
		);
	},
};
