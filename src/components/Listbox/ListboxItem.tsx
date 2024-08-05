import { useContext, type MouseEvent } from "react";
import type { SetRequired } from "type-fest";
import styles from './Listbox.module.scss';
import cx from 'classnames';
import { ListContext } from "./Listbox";
import type { BaseComponentProps } from "../../types";

export type ListboxItemProps = Omit<
	SetRequired<BaseComponentProps<"li">, "id">,
	"onClick" | "onMouseEnter"
> & {
	onClick?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
	onMouseEnter?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
    value: string;
};

export const ListboxItem = (props: ListboxItemProps) => {
	const { children, className, id, onClick, onMouseEnter, ...rest } = props;
	const {
		focusedItem,
		setFocusedItem,
		selectedItem,
		setSelectedItem,
		onSelectionChange,
		controlled,
	} = useContext(ListContext);
	const classNames = cx(styles["listbox-item"], className);

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		onClick?.({ id }, e);
		if (controlled) return;
		if (selectedItem === id) {
			setFocusedItem?.(undefined);
			setSelectedItem?.(undefined);
			onSelectionChange?.(undefined);
			return;
		}
		setFocusedItem?.(id);
		setSelectedItem?.(id);
		onSelectionChange?.({ selection: id });
	};

	return (
		<li
			className={classNames}
			data-focused={focusedItem === id}
			onClick={handleClick}
			onMouseEnter={(e: MouseEvent<HTMLLIElement>) =>
				onMouseEnter?.({ id }, e)
			}
			aria-selected={selectedItem === id}
			id={id}
			{...rest}
		>
			{children}
		</li>
	);
};
