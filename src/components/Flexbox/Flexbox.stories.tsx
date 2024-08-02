import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Flexbox } from "./Flexbox";

const meta = {
	title: "Example/Flexbox",
	component: Flexbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Flexbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Flexbox style={{ background: "#00cc0048" }} gap=".5rem">
					<Button fill>First</Button>
					<Button fill>Second</Button>
					<Button fill>Third</Button>
				</Flexbox>
			</div>
		);
	},
};

export const Inline: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Flexbox inline style={{ background: "#00cc0048" }} gap=".5rem">
					<Button fill>First</Button>
					<Button fill>Second</Button>
					<Button fill>Third</Button>
				</Flexbox>
			</div>
		);
	},
};
