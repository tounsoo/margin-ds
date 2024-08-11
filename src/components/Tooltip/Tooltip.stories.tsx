import type { Meta, StoryObj } from "@storybook/react";
import { useTooltip } from "./useTooltip";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";
import { useRef } from "react";

const meta = {
	title: "Component/Tooltip",
    component: Tooltip,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
	render: function Render() {
        const tooltipRef = useRef<HTMLSpanElement>(null)
        const { getAnchorProps, getTooltipProps } = useTooltip({tooltipRef});

		return (
				<>
                    <Button {...getAnchorProps()}>Click me</Button>
                    <Tooltip {...getTooltipProps({
                        ref: tooltipRef
                    })}>Hello world</Tooltip>
                </>
		);
	},
};