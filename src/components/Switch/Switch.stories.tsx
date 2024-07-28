import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Flex } from "../Flex";
import { Label } from "../Label";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Example/Switch",
	component: Switch,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: function Render() {
		return (
			<Flex gap=".5rem" alignItems="center">
				<Switch id="switch-id" />
				<Label htmlFor="switch-id">Default(uncontrolled)</Label>
			</Flex>
		);
	},
};
export const Controlled = {
	render: function Render() {
		return (
			<Flex gap=".5rem" alignItems="center">
				<Switch id="switch-id" checked={true} />
				<Label htmlFor="switch-id">Controlled</Label>
			</Flex>
		);
	},
};

export const Disabled = {
	render: function Render() {
		return (
			<Flex gap="1rem" direction="column">
				<Flex gap=".5rem" alignItems="center">
					<Switch id="switch-id" defaultChecked disabled />
					<Label htmlFor="switch-id" aria-disabled>
						Checked disabled
					</Label>
				</Flex>
				<Flex gap=".5rem" alignItems="center">
					<Switch id="switch-id" disabled />
					<Label htmlFor="switch-id" aria-disabled>
						Unchecked disabled
					</Label>
				</Flex>
			</Flex>
		);
	},
};
export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
				<Flex gap=".5rem" alignItems="center">
					<Switch id="switch-id" />
					<Label htmlFor="switch-id">Default(uncontrolled)</Label>
				</Flex>
			</A11yProvider>
		);
	},
};
