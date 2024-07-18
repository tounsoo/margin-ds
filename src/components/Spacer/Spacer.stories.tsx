import type { Meta, StoryObj } from "@storybook/react";
import { Spacer } from "./Spacer";

const meta = {
	title: "Example/Spacer",
	component: Spacer,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Example: Story = {
	render: function Render() {
		return (
			<div style={{ display: "flex", width: 280, border: "1px solid red" }}>
				<div style={{ width: 20, height: 20, background: 'purple'}}/>
                <Spacer />
				<div style={{ width: 20, height: 20, background: 'purple'}}/>
			</div>
		);
	},
};
