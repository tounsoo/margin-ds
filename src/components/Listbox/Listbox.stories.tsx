import type { Meta, StoryObj } from "@storybook/react";
import { Listbox } from "./Listbox";
import { useState } from "react";
import { Button } from "../Button";
import { Flexbox } from "../Flexbox";

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
                aria-label="number list"
			>
				<Listbox.Item id="01" value="01">01</Listbox.Item>
				<Listbox.Item id="02" value="02">02</Listbox.Item>
				<Listbox.Item id="03" value="03">03</Listbox.Item>
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
                    aria-label="number list"
				>
					{idArr.map((id) => (
						<Listbox.Item
							key={id}
							id={id}
							value={id}
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

export const WithObjectMapping = {
	render: function Render() {
                
        type User = {
            id: string;
            name: string;
            description: string;
            age: number;
        };

		const sampleData: User[] = [
			{
				id: "a1",
				name: "Alice C.",
				description: "Software Engineer",
				age: 30,
			},
			{
				id: "a2",
				name: "Alicee D.",
				description: "Software Engineer",
				age: 30,
			},
			{ id: "a3", name: "Bob", description: "Data Scientist", age: 25 },
			{
                id: "a4",
				name: "Charlie",
				description: "Product Manager",
				age: 35,
			},
			{ id: "a5", name: "David", description: "UX Designer", age: 28 },
			{
                id: "a6",
				name: "Eve",
				description: "Marketing Specialist",
				age: 40,
			},
            {
                id: "a7",
                name: "Ara",
                description: "Software Engineer",
                age: 30,
            },
		];

		return (
			<Listbox aria-label="object list">
				{sampleData.map((entry) => (
					<Listbox.Item key={entry.id} value={entry.name} id={entry.id}>
						{`${entry.name}`}
                        <div>
                        {`${entry.description} / ${entry.age}`}
                        </div>
					</Listbox.Item>
				))}
			</Listbox>
		);
	},
};
