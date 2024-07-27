import { Temporal } from "temporal-polyfill";
import type { DatePickerProps } from "./DatePicker";

type IsInvalidDateType = {
	date: Temporal.PlainDate;
	invalid: DatePickerProps["invalid"];
};

export const isInvalidDate = ({ date, invalid }: IsInvalidDateType) => {
	if (invalid?.after) {
		if (Temporal.PlainDate.compare(date, invalid.after) === 1) {
			return true;
		}
	}
	if (invalid?.before) {
		if (Temporal.PlainDate.compare(date, invalid.before) === -1) {
			return true;
		}
	}
	if (
		invalid?.dayOfWeeks &&
		(invalid.dayOfWeeks as Array<number>).includes(date.dayOfWeek)
	) {
		return true;
	}
	if (invalid?.dates) {
		for (const invalidate of invalid.dates) {
			if (Temporal.PlainDate.compare(date, invalidate) === 0) return true;
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

export const getNextClosestDate = ({ date, invalid }: IsInvalidDateType) => {
	const trys = 3_650;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const nextDate = date.add({ days: i });
		if (!isInvalidDate({ date: nextDate, invalid })) {
			return nextDate;
		}
	}
	return;
};

export const getPrevClosestDate = ({ date, invalid }: IsInvalidDateType) => {
	const trys = 3_650;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const prevDate = date.subtract({ days: i });
		if (!isInvalidDate({ date: prevDate, invalid })) {
			return prevDate;
		}
	}
	return;
};

export const getClosestDate = ({ date, invalid }: IsInvalidDateType) => {
	const trys = 3_650 / 2;
	for (let i = 0; i < trys; i++) {
		if (i === trys) break;
		const prevDate = date.subtract({ days: i });
		const nextDate = date.add({ days: i });
		const previnvalid = isInvalidDate({ date: prevDate, invalid });
		const nextinvalid = isInvalidDate({ date: nextDate, invalid });
		if (previnvalid === false) {
			return prevDate;
		}
		if (nextinvalid === false) {
			return nextDate;
		}
	}
	return date;
};
