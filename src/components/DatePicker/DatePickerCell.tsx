import { Button, type ButtonProps } from "../Button";

export const DatePickerCell = (props: ButtonProps) => {
	const { "aria-selected": ariaSelected, ...rest } = props;
	return (
		<Button
			fill
			appearance={ariaSelected ? "primary" : "ghost"}
			{...rest}
		/>
	);
};
