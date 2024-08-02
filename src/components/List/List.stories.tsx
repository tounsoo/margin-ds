import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { useState } from "react";
import { Button } from "../Button";

const meta = {
	title: "Example/List",
	component: List,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<List>
				<List.Item id="01">01</List.Item>
				<List.Item id="02">02</List.Item>
				<List.Item id="03">03</List.Item>
			</List>
		);
	},
};

export const Selectable: Story = {
	render: function Render() {
		return (
			<List selectable onSelectionChange={console.log}>
				<List.Item id="01">01</List.Item>
				<List.Item id="02">02</List.Item>
				<List.Item id="03">03</List.Item>
			</List>
		);
	},
};

export const FocusControlled: Story = {
	render: function Render() {
		const idArr = ["01", "02", "03"];
		const [selected, setSelected] = useState<string>();
		const [focusIndex, setFocusIndex] = useState(0);
		return (
			<>
				<Button
					onClick={() =>
						setFocusIndex((prev) =>
							prev === idArr.length - 1 ? 0 : prev + 1,
						)
					}
				>
					Next
				</Button>
				<Button
					onClick={() => {
						if (selected === idArr[focusIndex]) {
							setSelected(undefined);
						} else {
							setSelected(idArr[focusIndex]);
						}
					}}
				>
					Select
				</Button>
				<List
					selectable
					pseudoFocus
					focusedItem={idArr[focusIndex]}
					selected={selected}
				>
					{idArr.map((id) => (
						<List.Item key={id} id={id}>
							{id}
						</List.Item>
					))}
				</List>
			</>
		);
	},
};
