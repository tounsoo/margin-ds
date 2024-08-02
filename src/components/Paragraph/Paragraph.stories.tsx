import type { Meta, StoryObj } from "@storybook/react";
import { Paragraph } from "./Paragraph";
import { Flexbox } from "../Flexbox";

const meta = {
	title: "Example/Paragraph",
	component: Paragraph,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<Paragraph>
				Voluptate dolore incididunt est et. Fugiat Lorem proident dolore
				laborum officia amet est. Sunt ex officia reprehenderit nisi
				nostrud aliquip occaecat dolor consequat incididunt eiusmod
				incididunt amet ipsum. Proident duis nostrud Lorem ex tempor
				cillum Lorem consectetur anim aute cillum magna nisi ut.
				Exercitation magna qui pariatur sunt amet id duis ut adipisicing
				non dolor nostrud in. Do fugiat enim Lorem commodo commodo ea
				voluptate elit elit.
			</Paragraph>
		);
	},
};

export const Sizes: Story = {
	render: function Render() {
		return (
			<Flexbox flexDirection="column">
				<Paragraph size="x-small">
					Excepteur quis do esse quis.
				</Paragraph>
				<Paragraph size="small">Excepteur quis do esse quis.</Paragraph>
				<Paragraph>Excepteur quis do esse quis.</Paragraph>
				<Paragraph size="large">Excepteur quis do esse quis.</Paragraph>
				<Paragraph size="x-large">
					Excepteur quis do esse quis.
				</Paragraph>
				<Paragraph size="xx-large">
					Excepteur quis do esse quis.
				</Paragraph>
			</Flexbox>
		);
	},
};
