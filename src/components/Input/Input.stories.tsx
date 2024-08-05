import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";
import { Label } from "../Label";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Component/Input",
	component: Input,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		defaultValue: "test",
		"aria-label": "Test Input",
	},
};

export const WithButton = {
	render: function Render() {
		return (
			<Flexbox gap=".5rem">
				<Input aria-label="Test Input 2" />
				<Button>Action</Button>
			</Flexbox>
		);
	},
};

export const Accessible = {
	render: function Render() {
		return (
			<Flexbox flexDirection="column" gap="1rem">
				<Input
					aria-label="using-aria-label"
					defaultValue="Using aria-label"
				/>
				<Flexbox flexDirection="column">
					<Label htmlFor="using-htmlFor">Using htmlFor</Label>
					<Input id="using-htmlFor" />
				</Flexbox>
			</Flexbox>
		);
	},
};
export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
				<Flexbox gap=".5rem">
					<Input aria-label="Test Input 2" />
					<Button>Action</Button>
				</Flexbox>
			</A11yProvider>
		);
	},
};
