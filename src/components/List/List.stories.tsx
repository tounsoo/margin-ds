import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { useState } from "react";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";

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
			<List style={{ width: 200 }}>
				<List.Item id="01">
					Duis anim Lorem aliquip et esse culpa velit mollit ea ad eu
					dolor in. Fugiat eu quis nisi excepteur. Exercitation
					commodo minim nisi voluptate laborum occaecat ex labore.
					Consectetur aliquip anim nostrud occaecat esse sunt amet.
					Nostrud elit proident officia ipsum.
				</List.Item>
				<List.Item id="02">02</List.Item>
				<List.Item id="03">03</List.Item>
			</List>
		);
	},
};

export const Selectable: Story = {
	render: function Render() {
		return (
			<List
				selectable
				onSelectionChange={console.log}
				style={{ width: 200 }}
			>
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
		const [focusVisible, setFocusVisible] = useState(false);
		return (
			<Flexbox
				gap="1rem"
				flexDirection="column"
				onFocus={() => setFocusVisible(true)}
				onBlur={() => setFocusVisible(false)}
			>
				<Button.Group>
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
				</Button.Group>
				<List
					selectable
					pseudoFocusVisible={focusVisible}
					focusedItem={idArr[focusIndex]}
					selected={selected}
				>
					{idArr.map((id) => (
						<List.Item
							key={id}
							id={id}
							onClick={({ id }) => {
								setSelected(id);
							}}
							onMouseEnter={({ id }) => {
								setFocusIndex(idArr.indexOf(id));
							}}
						>
							{id}
						</List.Item>
					))}
				</List>
			</Flexbox>
		);
	},
};
