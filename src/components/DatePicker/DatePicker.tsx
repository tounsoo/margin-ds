import {
	useRef,
	useState,
	type ComponentPropsWithoutRef,
	type ReactElement,
	type MouseEvent,
	type KeyboardEvent,
	useEffect,
} from "react";
import { useMonth, type UseMonthProps } from "../../hooks";
import { Temporal } from "temporal-polyfill";
import cx from "classnames";
import styles from "./DatePicker.module.scss";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { Heading } from "../Heading";
import { Label } from "../Label";
import type { a11yProps } from "../../types";
import {
	getClosestDate,
	getFirstOfWeek,
	getLastOfWeek,
	getNextClosestDate,
	getPrevClosestDate,
	isDisabledDate,
} from "./utils";
import { DatePickerCell } from "./DatePickerCell";

export type DatePickerCellProps = {
	"data-value": string;
	"aria-label": string;
	onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
	onClick: (e: MouseEvent<HTMLButtonElement>) => void;
	tabIndex: number;
};

export type DatePickerProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"defaultValue"
> &
	Omit<UseMonthProps, "date"> & {
		disabled?: {
			dates?: Temporal.PlainDate[];
			dayOfWeeks?: Array<1 | 2 | 3 | 4 | 5 | 6 | 7>;
			after?: Temporal.PlainDate;
			before?: Temporal.PlainDate;
		};
		locale?: string;
		value?: Temporal.PlainDate;
		defaultValue?: Temporal.PlainDate;
		calendar?: Temporal.CalendarLike;
		onSelect?: ({
			date,
			e,
		}: { date: Temporal.PlainDate; e: MouseEvent<HTMLElement> }) => void;
		cell?: (props: DatePickerCellProps) => ReactElement;
		a11y?: a11yProps;
	};

export const DatePicker = (props: DatePickerProps) => {
	const {
		value,
		defaultValue,
		weekStartDay,
		onSelect,
		cell,
		locale: localeProp,
		a11y,
		disabled,
		calendar = "gregory",
		...rest
	} = props;

	const [currentDate, setCurrentDate] = useState(
		value?.withCalendar(calendar) ??
			defaultValue?.withCalendar(calendar) ??
			Temporal.Now.plainDate(calendar),
	);
	const [focusedDate, setFocusedDate] = useState(
		value?.withCalendar(calendar) ??
			defaultValue?.withCalendar(calendar) ??
			Temporal.Now.plainDate(calendar),
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: defaultValue is uncontrolled
	useEffect(() => {
		const closestDateAvailable = getClosestDate({
			date:
				value?.withCalendar(calendar) ??
				defaultValue?.withCalendar(calendar) ??
				Temporal.Now.plainDate(calendar),
			disabled,
		});
		setFocusedDate(closestDateAvailable);
	}, [value, calendar, disabled]);

	const gridRef = useRef<HTMLTableElement>(null);
	const monthArr = useMonth({ date: focusedDate, weekStartDay, calendar });

	const browserLocale = new Intl.DateTimeFormat().resolvedOptions().locale;
	const locale = localeProp ?? browserLocale;

	const monthYearLocaleString = focusedDate
		.toPlainDateTime()
		.toLocaleString(locale, {
			month: "long",
			year: "numeric",
			calendar: calendar as string,
		});

	const updateFocus = (date: Temporal.PlainDate) => {
        // Safari sometimes does not apply focus ring
        // might need to use document.queryselect().click()
        // to force this if the issue persists
        
		setTimeout(() => {
			const targetElement = gridRef.current?.querySelector(
				`[data-value="${date.toString()}"]`,
			) as HTMLButtonElement;
			targetElement?.focus();
		}, 100);
	};

	const onKeyboardDown = (
		// date: Temporal.PlainDate,
		e: KeyboardEvent<HTMLButtonElement>,
	) => {
		const overrides = [
			"ArrowDown",
			"ArrowUp",
			"ArrowRight",
			"ArrowLeft",
			"PageUp",
			"PageDown",
			"Home",
			"End",
		];
		if (overrides.includes(e.key)) {
			e.preventDefault();
			e.stopPropagation();

			let targetDate = focusedDate;

			switch (e.key) {
				case "ArrowDown":
					targetDate = focusedDate.add({ weeks: 1 });
					break;

				case "ArrowUp":
					targetDate = focusedDate.subtract({ weeks: 1 });
					break;

				case "ArrowRight":
					targetDate = focusedDate.add({ days: 1 });
					break;

				case "ArrowLeft":
					targetDate = focusedDate.subtract({ days: 1 });
					break;

				case "PageUp":
					if (e.shiftKey) {
						targetDate = focusedDate.subtract({ years: 1 });
						break;
					}
					targetDate = focusedDate.subtract({ months: 1 });
					break;

				case "PageDown":
					if (e.shiftKey) {
						targetDate = focusedDate.add({ years: 1 });
						break;
					}
					targetDate = focusedDate.add({ months: 1 });
					break;

				case "Home":
					targetDate = focusedDate.subtract({
						days: getFirstOfWeek({ date:focusedDate, weekStartDay }),
					});
					break;

				case "End":
					targetDate = focusedDate.add({
						days: getLastOfWeek({ date:focusedDate, weekStartDay }),
					});
					break;

				default:
					break;
			}

			if (isDisabledDate({ date: targetDate, disabled })) {
				const diff = Temporal.PlainDate.compare(targetDate, focusedDate);

				if (disabled?.after && diff === 1) {
					const prevPossibleDate = getPrevClosestDate({
						date: disabled.after.withCalendar(calendar),
						disabled,
					});
					prevPossibleDate && setFocusedDate(prevPossibleDate);
					prevPossibleDate && updateFocus(prevPossibleDate);
					return;
				}

				if (disabled?.before && diff === -1) {
					const nextPossibleDate = getPrevClosestDate({
						date: disabled.before.withCalendar(calendar),
						disabled,
					});
					nextPossibleDate && setFocusedDate(nextPossibleDate);
					nextPossibleDate && updateFocus(nextPossibleDate);
					return;
				}

				if (diff === 1) {
					const nextDate = getNextClosestDate({
						date: targetDate,
						disabled,
					});

					if (nextDate) {
						setFocusedDate(nextDate);
						updateFocus(nextDate);
						return;
					}
				}

				if (diff === -1) {
					const prevDate = getPrevClosestDate({
						date: targetDate,
						disabled,
					});

					if (prevDate) {
						setFocusedDate(prevDate);
						updateFocus(prevDate);
						return;
					}
				}

				return;
			}

			setFocusedDate(targetDate);
			updateFocus(targetDate);
		}
	};

	const prevMonth = focusedDate.subtract({ months: 1 });
	const nextMonth = focusedDate.add({ months: 1 });

	return (
		<Flex
			direction="column"
			className={styles.datepicker}
			key={monthYearLocaleString}
			gap=".5rem"
			{...rest}
		>
			<Flex
				className={styles.header}
				alignItems="center"
				justifyContent="space-between"
				grow="1"
			>
				<Heading as="h5">
					<span role="status">{monthYearLocaleString}</span>
				</Heading>
				<Flex gap=".5rem">
					<Button
						className={styles.controller}
						aria-label={`Go to ${prevMonth.toLocaleString(locale, { month: "long", year: "numeric", calendar: calendar as string })}`}
						appearance="ghost"
						disabled={
							disabled?.before &&
							Temporal.PlainDate.compare(
								prevMonth.with({ day: Number.MAX_VALUE }),
								disabled?.before,
							) === -1
						}
						onClick={() => setFocusedDate(prevMonth)}
						a11y={a11y}
					>
						&larr;
					</Button>
					<Button
						className={styles.controller}
						aria-label={`Go to ${nextMonth.toLocaleString(locale, { month: "long", year: "numeric", calendar: calendar as string })}`}
						appearance="ghost"
						disabled={
							disabled?.after &&
							Temporal.PlainDate.compare(
								prevMonth.with({ day: 1 }),
								disabled?.after,
							) === 1
						}
						onClick={() => setFocusedDate(nextMonth)}
						a11y={a11y}
					>
						&rarr;
					</Button>
				</Flex>
			</Flex>
			<table
				role="grid"
				className={styles["date-grid"]}
				aria-label={monthYearLocaleString}
				ref={gridRef}
			>
				<thead>
					<tr>
						{monthArr[0].map((date) => {
							return (
								<th
									key={date.dayOfWeek}
									aria-label={date.toLocaleString(locale, {
										weekday: "long",
										calendar: calendar as string,
									})}
								>
									<Label>
										{date.toLocaleString(locale, {
											weekday: "narrow",
											calendar: calendar as string,
										})}
									</Label>
								</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{monthArr.map((value) => {
						return (
							<tr
								key={`${value[0].monthCode}${value[0].dayOfYear}`}
							>
								{value.map((date) => {
									const ariaHidden = !date
										.toPlainYearMonth()
										.equals(focusedDate.toPlainYearMonth());

									const ariaSelected =
										Temporal.PlainDate.compare(date, currentDate) === 0;

									const isDisabled = isDisabledDate({
										date,
										disabled,
									});

									const firstAvailableDate = () => {
										if (!disabled?.before) return;
										return getNextClosestDate({
											date: disabled.before.withCalendar(
												calendar,
											),
											disabled,
										});
									};

									const lastAvailableDate = () => {
										if (!disabled?.after) return;
										return getPrevClosestDate({
											date: disabled.after.withCalendar(
												calendar,
											),
											disabled,
										});
									};

									const returnProps = {
										tabIndex: date.equals(focusedDate)
											? 0
											: -1,
										className: cx(styles.button, {
											[styles.hidden]: ariaHidden,
										}),
										children: date.day,
										"data-value": date.toString(),
										"aria-hidden": ariaHidden,
										"aria-disabled": isDisabled,
										"aria-selected": ariaSelected,
										"aria-label": [
											date.toLocaleString(locale, {
												month: "long",
												year: "numeric",
												day: "numeric",
												calendar: calendar as string,
											}),
											ariaSelected && "selected",
											lastAvailableDate()?.equals(date) &&
												"you are on last available date",
											firstAvailableDate()?.equals(
												date,
											) &&
												"you are on last available date",
										]
											.filter(Boolean)
											.join(", "),
										onKeyDown: (
											e: KeyboardEvent<HTMLButtonElement>,
										) => onKeyboardDown(e),
										onClick: (
											e: MouseEvent<HTMLElement>,
										) => {
											onSelect?.({ date, e });
											if (props.value) return;
											if (isDisabled) return;
                                            setCurrentDate(date);
                                            setFocusedDate(date);
										},
									};

									return (
										<td
											className={styles.cell}
											key={date.day}
											aria-selected={ariaSelected}
										>
											{cell ? (
												cell?.(returnProps)
											) : (
												<Button
													fill
													appearance={
														ariaSelected
															? "primary"
															: "ghost"
													}
													a11y={a11y}
													{...returnProps}
												/>
											)}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</Flex>
	);
};

DatePicker.Cell = DatePickerCell;
