import {
	type MouseEvent,
	useEffect,
	useState,
	type ComponentPropsWithoutRef,
	useRef,
} from "react";
import styles from "./Switch.module.scss";
import cx from "classnames";
import { useA11y } from "../../providers";
import { useAccessibleTarget } from "../../hooks";
import type { a11yProps } from "../../types";
import type { Except, RequireAtLeastOne } from "type-fest";

type RequiredProps = "id" | "aria-label" | "aria-labelledby";
// export type CheckboxProps =
//     Except<ComponentPropsWithoutRef<'input'>, RequiredProps>
//     & RequireAtLeastOne<ComponentPropsWithoutRef<'input'>, RequiredProps>
//     & {
//         a11y?: a11yProps
//     };

export type SwitchProps = Except<
	Omit<
		ComponentPropsWithoutRef<"button">,
		"checked" | "defaultChecked" | "onChange" | "children"
	>,
	RequiredProps
> &
	RequireAtLeastOne<
		Omit<
			ComponentPropsWithoutRef<"button">,
			"checked" | "defaultChecked" | "onChange" | "children"
		>,
		RequiredProps
	> & {
		defaultChecked?: boolean;
		checked?: boolean;
		onChange?: (e: boolean) => void;
		a11y?: a11yProps;
	};

export const Switch = (props: SwitchProps) => {
	const {
		checked,
		defaultChecked,
		className,
		onClick,
		onChange,
		a11y,
		style,
		...rest
	} = props;
	const switchRef = useRef<HTMLButtonElement>(null);
	const [checkState, setCheckState] = useState(
		checked ?? defaultChecked ?? false,
	);
	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		if (typeof checked === "undefined") {
			onChange?.(!checkState);
			setCheckState(!checkState);
		}
		onClick?.(e);
	};

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: switchRef,
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

	// biome-ignore lint/correctness/useExhaustiveDependencies: onChange should not rerender
	useEffect(() => {
		if (typeof checked === "undefined") return;
		onChange?.(checked);
		setCheckState(checked);
	}, [checked]);

	const combinedStyle = {
		...safetyMargin,
		...style,
	};

	return (
		<button
			type="button"
			ref={switchRef}
			role="switch"
			aria-checked={checkState}
			onClick={onClickHandler}
			className={cx(styles.switch, className)}
			style={combinedStyle}
			{...rest}
		>
			<span className={styles.toggle} />
		</button>
	);
};
