import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";

const meta = {
	title: "Example/List",
	component: List,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<List>
                <List.Item id="01">01</List.Item>
                <List.Item id="02">02</List.Item>
                <List.Item id="03">03</List.Item>
            </List>
		);
	},
};

export const Selectable: Story = {
	render: function Render() {
		return (
			<List selectable onSelectionChange={console.log}>
                <List.Item id="01">01</List.Item>
                <List.Item id="02">02</List.Item>
                <List.Item id="03">03</List.Item>
            </List>
		);
	},
};
