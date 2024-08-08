import type { Meta, StoryObj } from "@storybook/react";
import { Kbd } from "./Kbd";
import { Paragraph } from "../Paragraph";
import { Code } from "../Code";

const meta = {
	title: "Component/Kbd",
	component: Kbd,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<Paragraph>
				Voluptate <Kbd>Ctrl ⌘</Kbd> incididunt <Code>est et. Fugiat</Code> Lorem
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
