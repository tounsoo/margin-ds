import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Temporal } from "temporal-polyfill";

const meta = {
	title: "Example/DatePicker",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example: Story = {
	render: function Render() {
		return (
			<DatePicker
				value={Temporal.Now.plainDate('gregory')}
				// defaultValue={Temporal.Now.plainDate("gregory")}
				disabled={{
					dates: [
						Temporal.Now.plainDate("gregory").subtract({ days: 2 }),
						Temporal.Now.plainDate("gregory").subtract({ days: 1 }),
						Temporal.Now.plainDate("gregory"),
						Temporal.Now.plainDate("gregory").add({ days: 1 }),
						Temporal.Now.plainDate("gregory").add({ days: 2 }),
					],
					dayOfWeeks: [7, 6],
					// after: Temporal.Now.plainDate('gregory').add({days: 3}),
					// before: Temporal.Now.plainDate('gregory').subtract({days: 3})
				}}
				onSelect={console.log}
				cell={(props) => <DatePicker.Cell {...props} />}
				// locale="ko"
				// calendar={"hebrew"}
			/>
		);
	},
};
