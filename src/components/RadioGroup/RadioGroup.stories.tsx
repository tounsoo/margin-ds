import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Label } from "../Label";
import { Group } from "../Group";

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
                <Group>
                    <RadioGroup.Radio id="test1-01" name="test1" value="First" />
                    <Label htmlFor="test1-01">First</Label>
                </Group>
                <Group>
                    <RadioGroup.Radio id="test1-02" name="test1" value="Second" />
                    <Label htmlFor="test1-02">Second</Label>
                </Group>
                <Group>
                    <RadioGroup.Radio id="test1-03" name="test1" value="Third" />
                    <Label htmlFor="test1-03">Third</Label>
                </Group>
                
            </>
        )
	},
};
