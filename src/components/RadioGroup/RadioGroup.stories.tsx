import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Label } from "../Label";
import { Flex } from "../Flex";
import { A11yProvider } from "../../providers";

const meta = {
	title: "Example/RadioGroup",
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
				<Flex gap=".25rem">
					<RadioGroup.Item id="test1-01" name="test1" value="First" />
					<Label htmlFor="test1-01">First</Label>
				</Flex>
				<Flex gap=".25rem">
					<RadioGroup.Item
						id="test1-02"
						name="test1"
						value="Second"
						disabled
					/>
					<Label htmlFor="test1-02" aria-disabled>
						Second
					</Label>
				</Flex>
				<Flex gap=".25rem">
					<RadioGroup.Item id="test1-03" name="test1" value="Third" />
					<Label htmlFor="test1-03">Third</Label>
				</Flex>
			</>
		),
	},
};

export const Example = {
	render: function Render() {
		return (
			<Flex direction="column">
				<Label htmlFor="radiogroup-example">
					<b>Radiogroup Example</b>
				</Label>
				<RadioGroup id="radiogroup-example">
					<Flex gap=".25rem">
						<RadioGroup.Item
							id="test2-01"
							name="test2"
							value="First"
						/>
						<Label htmlFor="test2-01">First</Label>
					</Flex>
					<Flex gap=".25rem">
						<RadioGroup.Item
							id="test2-02"
							name="test2"
							value="Second"
						/>
						<Label htmlFor="test2-02">Second</Label>
					</Flex>
					<Flex gap=".25rem">
						<RadioGroup.Item
							id="test2-03"
							name="test2"
							value="Third"
						/>
						<Label htmlFor="test2-03">Third</Label>
					</Flex>
				</RadioGroup>
			</Flex>
		);
	},
};

export const AAA: Story = {
	args: {
		"aria-label": "test1",
		children: (
			<A11yProvider level="AAA">
				<Flex gap=".25rem">
					<RadioGroup.Item id="test1-01" name="test1" value="First" />
					<Label htmlFor="test1-01">First</Label>
				</Flex>
				<Flex gap=".25rem">
					<RadioGroup.Item
						id="test1-02"
						name="test1"
						value="Second"
						disabled
					/>
					<Label htmlFor="test1-02" aria-disabled>
						Second
					</Label>
				</Flex>
				<Flex gap=".25rem">
					<RadioGroup.Item id="test1-03" name="test1" value="Third" />
					<Label htmlFor="test1-03">Third</Label>
				</Flex>
			</A11yProvider>
		),
	},
};
