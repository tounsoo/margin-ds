import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Flexbox } from "../Flexbox";
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
			<Flexbox gap=".5rem" alignItems="center">
				<Switch id="switch-id" />
				<Label htmlFor="switch-id">Default(uncontrolled)</Label>
			</Flexbox>
		);
	},
};
export const Controlled = {
	render: function Render() {
		return (
			<Flexbox gap=".5rem" alignItems="center">
				<Switch id="switch-id" checked={true} />
				<Label htmlFor="switch-id">Controlled</Label>
			</Flexbox>
		);
	},
};

export const Disabled = {
	render: function Render() {
		return (
			<Flexbox gap="1rem" flexDirection="column">
				<Flexbox gap=".5rem" alignItems="center">
					<Switch id="switch-id" defaultChecked disabled />
					<Label htmlFor="switch-id" aria-disabled>
						Checked disabled
					</Label>
				</Flexbox>
				<Flexbox gap=".5rem" alignItems="center">
					<Switch id="switch-id" disabled />
					<Label htmlFor="switch-id" aria-disabled>
						Unchecked disabled
					</Label>
				</Flexbox>
			</Flexbox>
		);
	},
};
export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
				<Flexbox gap=".5rem" alignItems="center">
					<Switch id="switch-id" />
					<Label htmlFor="switch-id">Default(uncontrolled)</Label>
				</Flexbox>
			</A11yProvider>
		);
	},
};
