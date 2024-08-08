import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";
import { Flexbox } from "../Flexbox";
import { Label } from "../Label";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Component/Switch",
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
				<Switch id="switch-id">Default(uncontrolled)</Switch>
		);
	},
};
export const Controlled = {
	render: function Render() {
		return (
				<Switch id="switch-id" checked={true}>Controlled</Switch>
		);
	},
};

export const Disabled = {
	render: function Render() {
		return (
			<Flexbox gap="1rem" flexDirection="column">
					<Switch id="switch-id" defaultChecked disabled>
                    Checked disabled</Switch>
					<Switch id="switch-id" disabled>Unchecked disabled</Switch>
					
			</Flexbox>
		);
	},
};
export const AAA = {
	render: function Render() {
		return (
			<A11yProvider level="AAA">
					<Switch id="switch-id">Default(uncontrolled)</Switch>
			</A11yProvider>
		);
	},
};
