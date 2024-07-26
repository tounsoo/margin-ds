import { Temporal } from "temporal-polyfill";
import type { DatePickerProps } from "./DatePicker";

type IsDisabledDateType = {
	date: Temporal.PlainDate;
	disabled: DatePickerProps["disabled"];
};

export const isDisabledDate = ({ date, disabled }: IsDisabledDateType) => {
	if (disabled?.after) {
		if (Temporal.PlainDate.compare(date, disabled.after) === 1) {
			console.log("after");
			return true;
		}
	}
	if (disabled?.before) {
		if (Temporal.PlainDate.compare(date, disabled.before) === -1) {
			console.log("before");
			return true;
		}
	}
	if (
		disabled?.dayOfWeeks &&
		(disabled.dayOfWeeks as Array<number>).includes(date.dayOfWeek)
	) {
		return true;
	}
	if (disabled?.dates) {
		for (const disableDate of disabled.dates) {
			// console.log(disableDate.toPlainDateTime() compare(date, disableDate);
			if (Temporal.PlainDate.compare(date, disableDate) === 0)
				return true;
		}
	}
	return false;
};

export const getFirstOfWeek = ({
	date,
	weekStartDay,
}: { date: Temporal.PlainDate; weekStartDay?: number }) => {
	const offset = 7 - (weekStartDay ?? 0) + date.dayOfWeek;
	if (offset === 14) return offset - 14;
	if (offset > 6) return offset - 7;
	return offset;
};

export const getLastOfWeek = ({
	date,
	weekStartDay,
}: { date: Temporal.PlainDate; weekStartDay?: number }) => {
	const offset = 7 + (weekStartDay ?? 0) - date.dayOfWeek - 1;
	if (offset > 6) return offset - 7;
	if (offset < 0) return offset + 7;
	return offset;
};

export const getNextClosestDate = ({ date, disabled }: IsDisabledDateType) => {
	const trys = 3_650;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const nextDate = date.add({ days: i });
		if (!isDisabledDate({ date: nextDate, disabled })) {
			return nextDate;
		}
	}
	return;
};

export const getPrevClosestDate = ({ date, disabled }: IsDisabledDateType) => {
	const trys = 3_650;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const prevDate = date.subtract({ days: i });
		if (!isDisabledDate({ date: prevDate, disabled })) {
			return prevDate;
		}
	}
	return;
};

export const getClosestDate = ({ date, disabled }: IsDisabledDateType) => {
	const trys = 3_650 / 2;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const prevDate = date.subtract({ days: i });
		const nextDate = date.add({ days: i });
		const prevDisabled = isDisabledDate({ date: prevDate, disabled });
		const nextDisabled = isDisabledDate({ date: nextDate, disabled });
		if (prevDisabled === false) {
			return prevDate;
		}
		if (nextDisabled === false) {
			return nextDate;
		}
	}
	return date;
};
