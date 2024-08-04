import type { Meta, StoryObj } from "@storybook/react";
import { useMonth } from "./useMonth";
import { Flexbox } from "../../components";
import { Temporal } from "temporal-polyfill";

const meta = {
	title: "Hook/useMonth",
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof useMonth>;

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
		const monthArr = useMonth({
			date: Temporal.PlainDate.from("2024-08-03"),
		});

		return (
			<Flexbox flexDirection="column">
				{monthArr.map((week, index) => {
					return (
						<ul key={week[index].weekOfYear}>
							{week.map((day) => {
								return (
									<li key={day.daysInYear}>
										{day.toString()}
										<ul>
											<li>dayOfWeek: {day.dayOfWeek}</li>
											<li>dayOfYear: {day.dayOfYear}</li>
											<li>
												daysInMonth: {day.daysInMonth}
											</li>
											<li>
												daysInYear: {day.daysInYear}
											</li>
										</ul>
									</li>
								);
							})}
						</ul>
					);
				})}
			</Flexbox>
		);
	},
};
