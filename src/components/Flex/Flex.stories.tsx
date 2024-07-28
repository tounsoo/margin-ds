import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Flex } from "./Flex";

const meta = {
	title: "Example/Flex",
	component: Flex,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Flex style={{ background: "#00cc0048" }} gap=".5rem">
					<Button fill>First</Button>
					<Button fill>Second</Button>
					<Button fill>Third</Button>
				</Flex>
			</div>
		);
	},
};

export const Fill: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280, border: "1px solid red" }}>
				<Flex fill style={{ background: "#00cc0048" }} gap=".5rem">
					<Button fill>First</Button>
					<Button fill>Second</Button>
					<Button fill>Third</Button>
				</Flex>
			</div>
		);
	},
};
