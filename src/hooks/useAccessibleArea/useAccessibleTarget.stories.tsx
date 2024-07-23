import type { Meta, StoryObj } from "@storybook/react";
import { useAccessibleTarget, type useAccessibleTargetProps } from "./useAccessibleTarget";
import { useRef } from "react";

const meta = {
	title: "hooks/useAccessibleTarget",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof useAccessibleTarget>;

export default meta;
type Story = StoryObj<useAccessibleTargetProps & { buttonLabel: string, height: number }>;

export const Level: Story = {
	args: {
		level: "AA",
        buttonLabel: 'Test',
        height: 20,
	},
    render: function Render(args) {
        const buttonRef = useRef<HTMLButtonElement>(null);
        const safetyMargin = useAccessibleTarget({element: buttonRef, level: args.level, clear: args.clear});
        const combinedStyle = {
            height: args.height,
            ...safetyMargin
        }
        return <button type="button" ref={buttonRef} style={combinedStyle}>{args.buttonLabel}</button>
    }
};
