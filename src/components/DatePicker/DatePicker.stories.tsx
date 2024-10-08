import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./DatePicker";
import { Temporal } from "temporal-polyfill";

const meta = {
	title: "Component/DatePicker",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: function Render() {
		return <DatePicker defaultValue={Temporal.Now.plainDate("gregory")} />;
	},
};

export const DefaultFocused: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				defaultFocused={Temporal.Now.plainDate("gregory").add({
					months: 1,
				})}
			/>
		);
	},
};

export const Controlled: Story = {
	render: function Render() {
		return <DatePicker value={Temporal.Now.plainDate("gregory")} />;
	},
};

export const DisableWeekend: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				invalid={{
					dayOfWeeks: [7, 6],
				}}
				onSelect={console.log}
				cell={(props) => <DatePicker.Cell {...props} />}
			/>
		);
	},
};

export const DisableDates: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				invalid={{
					dates: [
						Temporal.Now.plainDate("gregory").subtract({ days: 3 }),
						Temporal.Now.plainDate("gregory").subtract({ days: 2 }),
						Temporal.Now.plainDate("gregory").add({ days: 2 }),
						Temporal.Now.plainDate("gregory").add({ days: 3 }),
					],
				}}
				onSelect={console.log}
				cell={(props) => <DatePicker.Cell {...props} />}
			/>
		);
	},
};

export const DisableLimit: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				invalid={{
					after: Temporal.Now.plainDate("gregory").add({ days: 2 }),
					before: Temporal.Now.plainDate("gregory").subtract({
						days: 2,
					}),
				}}
				onSelect={console.log}
				cell={(props) => <DatePicker.Cell {...props} />}
			/>
		);
	},
};

export const Locale: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				locale="ko"
			/>
		);
	},
};

export const ChangeCalendar: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				calendar={"hebrew"}
			/>
		);
	},
};

export const CellOverride: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				cell={(props) => <DatePicker.Cell size="small" {...props} />}
			/>
		);
	},
};

export const AAA: Story = {
	render: function Render() {
		return (
			<DatePicker
				defaultValue={Temporal.Now.plainDate("gregory")}
				cell={(props) => <DatePicker.Cell {...props} />}
				a11y={{ level: "AAA" }}
			/>
		);
	},
};
