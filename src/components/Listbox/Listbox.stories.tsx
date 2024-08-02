import type { Meta, StoryObj } from "@storybook/react";
import { Listbox } from "./Listbox";
import { useState } from "react";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";

const meta = {
	title: "Example/Listbox",
	component: Listbox,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof Listbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return (
			<Listbox
				defaultSelected="01"
				onSelectionChange={console.log}
				style={{ width: 200 }}
			>
				<Listbox.Item id="01">01</Listbox.Item>
				<Listbox.Item id="02">02</Listbox.Item>
				<Listbox.Item id="03">03</Listbox.Item>
			</Listbox>
		);
	},
};

export const FocusControlled: Story = {
	render: function Render() {
		const idArr = ["01", "02", "03"];
		const [selected, setSelected] = useState<string | null>();
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
								setSelected(null);
							} else {
								setSelected(idArr[focusIndex]);
							}
						}}
					>
						Select
					</Button>
				</Button.Group>
				<Listbox
					pseudoFocusVisible={focusVisible}
					focusedItem={idArr[focusIndex]}
					selected={selected}
				>
					{idArr.map((id) => (
						<Listbox.Item
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
						</Listbox.Item>
					))}
				</Listbox>
			</Flexbox>
		);
	},
};
