import { useEffect, useRef, useState, type MouseEvent } from "react";
import styles from "./Button.module.scss";
import cx from "classnames";
import { useA11y } from "../../providers";
import type { BaseComponentProps, A11yProps } from "../../types";
import { useAccessibleTarget } from "../../hooks";
import { Flexbox, type FlexboxProps } from "../Flexbox";

export type ButtonProps = BaseComponentProps<"button", "disabled"> & {
	/**
	 * @default default
	 */
	appearance?: "default" | "primary" | "secondary" | "ghost" | "danger";
	/**
	 * @default medium
	 */
	size?: "small" | "medium";
	fill?: boolean;
	a11y?: A11yProps;
};

export const Button = (props: ButtonProps) => {
	const {
		appearance = "default",
		size,
		fill,
		children,
		className,
		style,
		a11y,
		...rest
	} = props;
	const buttonRef = useRef<HTMLButtonElement>(null);

	const classNames = cx(styles.button, styles[appearance], className, {
		[styles.fill]: fill,
		[styles.small]: size === "small",
	});

	const { level } = useA11y();
	const safetyMargin = useAccessibleTarget({
		element: buttonRef,
		level: a11y?.level ?? level,
		clear: a11y?.clear,
	});

	const combinedStyle = {
		...safetyMargin,
		...style,
	};

	return (
		<button
			ref={buttonRef}
			className={classNames}
			style={combinedStyle}
			{...rest}
		>
			{children}
		</button>
	);
};

Button.Group = (props: FlexboxProps) => {
	const { className, ...rest } = props;
	const classNames = cx(styles["button-group"], className);
	return <Flexbox className={classNames} {...rest} />;
};

export type ButtonToggleProps = Omit<
	ButtonProps,
	"appearance" | "aria-pressed"
> & {
	pressed?: boolean;
	defaultPressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
};

Button.Toggle = (props: ButtonToggleProps) => {
	const { onClick, pressed, defaultPressed, onPressedChange, ...rest } =
		props;
	const [isPressed, setIsPressed] = useState(
		pressed ?? defaultPressed ?? false,
	);
	const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
		if (typeof pressed === "undefined") {
			onPressedChange?.(!isPressed);
			setIsPressed(!isPressed);
		}

		onClick?.(e);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: onPressedChange should not trigger rerender
	useEffect(() => {
		if (typeof pressed === "undefined") return;
		setIsPressed(pressed);
		onPressedChange?.(pressed);
	}, [pressed]);

	return (
		<Button
			appearance="ghost"
			onClick={onClickHandler}
			aria-pressed={isPressed}
			{...rest}
		/>
	);
};
