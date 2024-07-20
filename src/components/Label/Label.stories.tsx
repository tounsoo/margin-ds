import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";
import { Checkbox } from "../Checkbox";
import { Group } from "../Group";
import { Input } from "../Input";

const meta = {
	title: "Example/Label",
	component: Label,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithCheckbox: Story = {
	render: function Render() {
        return (
            <Group alignItems="start" gap=".5rem">
                <Checkbox id="test" />
                <Label htmlFor="test">
                    Hello World
                </Label>
            </Group>
        )
    }
};

export const WithInput: Story = {
	render: function Render() {
        return (
            <Group direction="column" alignItems="start">
                <Label htmlFor="test">
                    Hello World
                </Label>
                <Input id="test" />
            </Group>
        )
    }
};
