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
						<Flexbox>
							<RadioGroup.Item
								id="test2-01"
								name="test2"
								value="First"
							/>
							<Label htmlFor="test2-01">First</Label>
						</Flexbox>
						<Flexbox>
							<RadioGroup.Item
								id="test2-02"
								name="test2"
								value="Second"
							/>
							<Label htmlFor="test2-02">Second</Label>
						</Flexbox>
						<Flexbox>
							<RadioGroup.Item
								id="test2-03"
								name="test2"
								value="Third"
							/>
							<Label htmlFor="test2-03">Third</Label>
						</Flexbox>
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
						<Flexbox>
							<RadioGroup.Item
								id="test2-01"
								name="test2"
								value="First"
							/>
							<Label htmlFor="test2-01">First</Label>
						</Flexbox>
						<Flexbox>
							<RadioGroup.Item
								id="test2-02"
								name="test2"
								value="Second"
							/>
							<Label htmlFor="test2-02">Second</Label>
						</Flexbox>
						<Flexbox>
							<RadioGroup.Item
								id="test2-03"
								name="test2"
								value="Third"
							/>
							<Label htmlFor="test2-03">Third</Label>
						</Flexbox>
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
