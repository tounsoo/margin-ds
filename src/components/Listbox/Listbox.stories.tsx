import type { Meta, StoryObj } from "@storybook/react";
import { Listbox } from "./Listbox";
import { useState } from "react";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";
import { useList } from "../../hooks/useListbox";

const meta = {
	title: "Component/Listbox",
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

type User = {
	id: string;
	name: string;
	description: string;
	age: number;
};
export const WithTypeahead = {
	render: function Render() {
		const sampleData: User[] = [
			{
				id: "1",
				name: "Alice C.",
				description: "Software Engineer",
				age: 30,
			},
			{
				id: "2",
				name: "Alice D.",
				description: "Software Engineer",
				age: 30,
			},
			{ id: "3", name: "Bob", description: "Data Scientist", age: 25 },
			{
				id: "4",
				name: "Charlie",
				description: "Product Manager",
				age: 35,
			},
			{ id: "5", name: "David", description: "UX Designer", age: 28 },
			{
				id: "6",
				name: "Eve",
				description: "Marketing Specialist",
				age: 40,
			},
		];

		const { focusItem, handleKeyDown } = useList({
			data: sampleData,
			keys: ["name", "description", "age"],
		});

		return (
			<Listbox
				onKeyDown={handleKeyDown}
				focusedItem={
					sampleData[
						sampleData.findIndex((obj) => obj.id === focusItem.id)
					].id
				}
			>
				{sampleData.map((entry) => (
					<Listbox.Item key={entry.id} id={entry.id}>
						{`${entry.name} / ${entry.description} / ${entry.age}`}
					</Listbox.Item>
				))}
			</Listbox>
		);
	},
};
