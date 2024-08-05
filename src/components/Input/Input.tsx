import { useEffect, useRef, type ComponentPropsWithRef } from "react";
import type { Except, RequireAtLeastOne } from "type-fest";
import styles from "./Input.module.scss";
import cx from "classnames";
import type { A11yProps } from "../../types";
import { useAccessibleTarget } from "../../hooks";
import { useA11y } from "../../providers";
import { mergeRefs } from "../../functions";

type RequiredProps = "id" | "aria-label" | "aria-labelledby";
export type InputProps = Except<
	ComponentPropsWithRef<"input">,
	RequiredProps
> &
	RequireAtLeastOne<ComponentPropsWithRef<"input">, RequiredProps> & {
		a11y?: A11yProps;
	};

export const Input = (props: InputProps) => {
	const { style, a11y, ref, ...rest } = props;
	const inputRef = useRef<HTMLInputElement>(null);
	const classNames = cx(styles.input);

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: inputRef,
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

	const combinedStyle = {
		...safetyMargin,
		...style,
	};
	return (
		<input
			ref={ mergeRefs(ref, inputRef)}
			style={combinedStyle}
			className={classNames}
			{...rest}
		/>
	);
};
