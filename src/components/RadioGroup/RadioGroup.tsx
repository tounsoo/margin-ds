import {
	useEffect,
	useRef,
	useState,
	type ChangeEvent,
	type ComponentPropsWithoutRef,
} from "react";
import styles from "./RadioGroup.module.scss";
import cx from "classnames";
import type { Except, RequireAtLeastOne, SetRequired } from "type-fest";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import type { a11yProps } from "../../types";

type RequiredProps = "id" | "aria-label" | "aria-labelledby";
export type RadioGroupProps = Except<
	ComponentPropsWithoutRef<"div">,
	RequiredProps
> &
	RequireAtLeastOne<ComponentPropsWithoutRef<"input">, RequiredProps> & {};
export const RadioGroup = (props: RadioGroupProps) => {
	const { className, defaultValue, ...rest } = props;
	const classNames = cx(styles["radio-group"], className);

	useEffect(() => {
		if (rest["aria-label"]) return;
		if (
			rest["aria-labelledby"] &&
			!document.querySelectorAll(`[id='${rest["aria-labelledby"]}']`)
				.length
		) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• element with 'id' matching 'aria-labelledby' not found\n",
			);
			return;
		}
		if (
			rest.id &&
			!document.querySelectorAll(`[for='${rest.id}']`).length
		) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• element with 'for' matching 'id' not found\n",
				"• use id with htmlFor\n",
			);
			return;
		}
		if (!rest.id) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• use id with htmlFor\n",
			);
			return;
		}
	}, [rest.id, rest["aria-label"], rest["aria-labelledby"]]);

	return <div role="radiogroup" className={classNames} {...rest} />;
};

export type RadioGroupItemProps = SetRequired<
	ComponentPropsWithoutRef<"input">,
	"name"
> & {
	a11y?: a11yProps;
};

RadioGroup.Item = (props: RadioGroupItemProps) => {
	const { className, checked, onChange, style, a11y, ...rest } = props;
	const [checkState, setCheckState] = useState(checked);
	const classNames = cx(styles.item, className);
	const radioRef = useRef<HTMLInputElement>(null);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: radioRef,
		level: a11y?.level ?? level,
		clear: a11y?.clear,
	});

	useEffect(() => {
		if (rest["aria-label"]) return;
		if (
			rest["aria-labelledby"] &&
			!document.querySelectorAll(`[id='${rest["aria-labelledby"]}']`)
				.length
		) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• element with 'id' matching 'aria-labelledby' not found\n",
			);
			return;
		}
		if (
			rest.id &&
			!document.querySelectorAll(`[for='${rest.id}']`).length
		) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• element with 'for' matching 'id' not found\n",
				"• use id with htmlFor\n",
			);
			return;
		}
		if (!rest.id) {
			console.error(
				"[A11y Violation] Form element needs proper label\n",
				"• use id with htmlFor\n",
			);
			return;
		}
	}, [rest.id, rest["aria-label"], rest["aria-labelledby"]]);

	function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
		if (typeof checked !== "undefined") {
			e.target.checked = checked;
			onChange?.(e);
			return;
		}
		onChange?.(e);
	}

	useEffect(() => {
		setCheckState(checked);
	}, [checked]);

	const combinedStyle = {
		...safetyMargin,
		...style,
	};

	return (
		<input
			type="radio"
			ref={radioRef}
			style={combinedStyle}
			checked={checkState}
			className={classNames}
			onChange={handleOnChange}
			{...rest}
		/>
	);
};
