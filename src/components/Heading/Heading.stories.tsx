import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from ".";
import { Flexbox } from "../Flexbox";

const meta = {
	title: "Example/Heading",
	component: Heading,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: function Render() {
		return (
			<Flexbox flexDirection="column">
				<Heading as="h1">H1 Heading</Heading>
				<Heading as="h2">H2 Heading</Heading>
				<Heading as="h3">H3 Heading</Heading>
				<Heading as="h4">H4 Heading</Heading>
				<Heading as="h5">H5 Heading</Heading>
				<Heading as="h6">H6 Heading</Heading>
			</Flexbox>
		);
	},
};
