import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";
import { Group } from "../Group";
import { RadioGroup } from "../RadioGroup";
import { Label } from "../Label";
import { Heading } from "../Heading";

const meta = {
	title: "Example/Card",
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
                    <Card.Section>
                        <Heading as="h3">Card Title</Heading>
                    </Card.Section>
                    <Card.Section direction="column">
                        <Label htmlFor="radiogroup-example">Radiogroup Example</Label>
                        <RadioGroup id="radiogroup-example">
                            <Group>
                                <RadioGroup.Radio id="test2-01" name="test2" value="First" />
                                <Label htmlFor="test2-01">First</Label>
                            </Group>
                            <Group>
                                <RadioGroup.Radio id="test2-02" name="test2" value="Second" />
                                <Label htmlFor="test2-02">Second</Label>
                            </Group>
                            <Group>
                                <RadioGroup.Radio id="test2-03" name="test2" value="Third" />
                                <Label htmlFor="test2-03">Third</Label>
                            </Group>
                        </RadioGroup>
                    </Card.Section>
                    <Card.Section justifyContent="end">
                        <Button>First</Button>
                        <Button>First</Button>
                    </Card.Section>
                </Card>
			</div>
		);
	},
};
