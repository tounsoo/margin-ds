import { useEffect, useState } from "react";
import { Temporal } from "temporal-polyfill";

function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
	for (let i = 0; i < arr.length; i += n) {
		yield arr.slice(i, i + n);
	}
}

export type UseMonthProps = {
	date: Temporal.PlainDate;
	calendar?: Temporal.CalendarLike;
	weekStartDay?: 1 | 2 | 3 | 4 | 5 | 6;
};

export const useMonth = (props: UseMonthProps) => {
	const { date, weekStartDay, calendar = "gregory" } = props;
	const [Tdate, setTdate] = useState(date.withCalendar(calendar));
	useEffect(() => {
		if (
			Temporal.PlainDate.from(date.withCalendar(calendar)).equals(
				Temporal.PlainDate.from(Tdate.withCalendar(calendar)),
			)
		)
			return;
		setTdate(date.withCalendar(calendar));
	}, [date, Tdate, calendar]);

	const daysInMonth = Tdate.daysInMonth;
	const firstDay = Tdate.with({ day: 1 });
	const lastDay = Tdate.with({ day: daysInMonth });
	const weekdayOffset = weekStartDay ? weekStartDay : 0;
	const firstDayOfWeek = firstDay.dayOfWeek;
	const lastDayOfWeek = lastDay.dayOfWeek;
	const lastMonthOverflow = () => {
		const offset = Tdate.daysInWeek - weekdayOffset + firstDayOfWeek;
		let overflow = offset;
		if (offset > Tdate.daysInWeek - 1) overflow = offset - Tdate.daysInWeek;
		if (offset === Tdate.daysInWeek * 2)
			overflow = offset - Tdate.daysInWeek * 2;
		return [...Array(overflow).keys()]
			.map((i) => firstDay.subtract({ days: i + 1 }))
			.reverse();
	};
	const nextMonthOverflow = () => {
		const offset = Tdate.daysInWeek + weekdayOffset - lastDayOfWeek - 1;
		let overflow = offset;
		if (offset < 0) overflow = offset + Tdate.daysInWeek;
		if (offset > Tdate.daysInWeek - 1) overflow = offset - Tdate.daysInWeek;
		return [...Array(overflow).keys()].map((i) =>
			lastDay.add({ days: i + 1 }),
		);
	};
	const monthArr = [...Array(daysInMonth).keys()].map((i) =>
		Tdate.with({ day: i + 1 }),
	);
	const monthChuncArr = [
		...chunks(
			[...lastMonthOverflow(), ...monthArr, ...nextMonthOverflow()],
			Tdate.daysInWeek,
		),
	];

	return monthChuncArr;
};
