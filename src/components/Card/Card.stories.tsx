import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";
import { RadioGroup } from "../RadioGroup";
import { Label } from "../Label";
import { Heading } from "../Heading";

const meta = {
	title: "Component/Card",
	component: Card,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280 }}>
				<Card>
					<Heading as="h3">Card Title</Heading>
					<Label htmlFor="radiogroup-example">
						Radiogroup Example
					</Label>
					<RadioGroup id="radiogroup-example">
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
					</RadioGroup>
					<Button.Group justifyContent="end">
						<Button>First</Button>
						<Button>First</Button>
					</Button.Group>
				</Card>
			</div>
		);
	},
};

export const Tester: Story = {
	render: function Render() {
		return (
			<div style={{ width: 280 }}>
				<Card>
					<Heading as="h3">Card Title</Heading>
					<Label htmlFor="radiogroup-example">
						Radiogroup Example
					</Label>
					<RadioGroup id="radiogroup-example">
                    <RadioGroup.Item id="test2-01" name="test1" value="First">
					First
				</RadioGroup.Item>
				<RadioGroup.Item
					id="test2-02"
					name="test1"
					value="Second"
					disabled
				>
					Second
				</RadioGroup.Item>
				<RadioGroup.Item id="test2-03" name="test1" value="Third">
					Third
				</RadioGroup.Item>
					</RadioGroup>
					<Button.Group justifyContent="end">
						<Button>First</Button>
						<Button>First</Button>
					</Button.Group>
				</Card>
			</div>
		);
	},
};
