import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Label } from "../Label";
import { Flexbox } from "../Flexbox";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Component/RadioGroup",
	component: RadioGroup,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		"aria-label": "test1",
		children: (
			<>
				<RadioGroup.Item id="test1-01" name="test1" value="First">
					First
				</RadioGroup.Item>
				<RadioGroup.Item
					id="test1-02"
					name="test1"
					value="Second"
					disabled
				>
					Second
				</RadioGroup.Item>
				<RadioGroup.Item id="test1-03" name="test1" value="Third">
					Third
				</RadioGroup.Item>
			</>
		),
	},
};

export const Example = {
	render: function Render() {
		return (
			<Flexbox flexDirection="column">
				<Label htmlFor="radiogroup-example">
					<b>Radiogroup Example</b>
				</Label>
				<RadioGroup id="radiogroup-example" onChange={console.log}>
					<RadioGroup.Item id="test2-01" name="test2" value="First">
						First
					</RadioGroup.Item>
					<RadioGroup.Item id="test2-02" name="test2" value="Second">
						Second
					</RadioGroup.Item>
					<RadioGroup.Item id="test2-03" name="test2" value="Third">
						Third
					</RadioGroup.Item>
				</RadioGroup>
			</Flexbox>
		);
	},
};

export const AAA: Story = {
	args: {
		"aria-label": "test1",
		children: (
			<A11yProvider level="AAA">
				<RadioGroup id="radiogroup-example">
					<RadioGroup.Item id="test2-01" name="test2" value="First">
						First
					</RadioGroup.Item>
					<RadioGroup.Item id="test2-02" name="test2" value="Second">
						Second
					</RadioGroup.Item>
					<RadioGroup.Item id="test2-03" name="test2" value="Third">
						Third
					</RadioGroup.Item>
				</RadioGroup>
			</A11yProvider>
		),
	},
};
