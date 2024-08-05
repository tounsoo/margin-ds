import { Button, type ButtonProps } from "../Button";

export const DatePickerCell = (props: Omit<ButtonProps, 'appearance'>) => {
	const { "aria-selected": ariaSelected, ...rest } = props;
	return (
		<Button
			fill
			appearance={ariaSelected ? "primary" : "ghost"}
			{...rest}
		/>
	);
};
