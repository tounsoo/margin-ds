import type { Meta, StoryObj } from "@storybook/react";
import { Code } from "./Code";
import { Paragraph } from "../Paragraph";

const meta = {
	title: "Example/Code",
	component: Code,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<Paragraph>
				Voluptate <Code>dolore</Code> incididunt est et. Fugiat Lorem
				proident dolore laborum officia amet est. Sunt ex officia
				reprehenderit nisi nostrud aliquip occaecat dolor consequat
				incididunt eiusmod incididunt amet ipsum. Proident duis nostrud
				Lorem ex tempor cillum Lorem consectetur anim aute cillum magna
				nisi ut. Exercitation magna qui pariatur sunt amet id duis ut
				adipisicing non dolor nostrud in. Do fugiat enim Lorem commodo
				commodo ea voluptate elit elit.
			</Paragraph>
		);
	},
};
