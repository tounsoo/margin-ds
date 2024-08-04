import type { Meta, StoryObj } from "@storybook/react";
import type { ChangeEvent } from "react";
import { useTypeahead } from "../../hooks";
import { Flexbox } from "../../components";

const meta = {
	title: "Hook/useTypeahead",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof useTypeahead>;

export default meta;
type Story = StoryObj<typeof meta>;

type User = {
	id: string;
	name: string;
	description: string;
	age: number;
};
export const Default = {
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

		const { result, updateSearchString } = useTypeahead({
			data: sampleData,
			keys: ["name", "description", "age"],
		});

		const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
            updateSearchString(e.target.value);
		};

		return (
            <Flexbox flexDirection="column">
			<input
				onChange={handleOnChange}
				/>
                {JSON.stringify(result)}
            </Flexbox>
		);
	},
};
