import { useContext, type MouseEvent } from "react";
import type { SetRequired } from "type-fest";
import styles from './Menu.module.scss';
import cx from 'classnames';
import { MenuContext } from "./Menu";
import type { BaseComponentProps } from "../../types";

export type MenuItemProps = Omit<
	SetRequired<BaseComponentProps<"li">, "id">,
	"onClick" | "onMouseEnter"
> & {
	onClick?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
	onMouseEnter?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
    value: string;
};

export const MenuItem = (props: MenuItemProps) => {
	const { children, className, id, onClick, onMouseEnter, ...rest } = props;
	const {
		focusedItem,
		setFocusedItem,
	} = useContext(MenuContext);
	const classNames = cx(styles["menu-item"], className);

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		onClick?.({ id }, e);
		setFocusedItem?.(id);
	};

	return (
		<li
            // biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: Not sure why this is a11y issue
            role="menuitem"
			className={classNames}
			data-focused={focusedItem === id}
			onClick={handleClick}
			onMouseEnter={(e: MouseEvent<HTMLLIElement>) => {
				onMouseEnter?.({ id }, e)
                setFocusedItem?.(id);
            }
			}
			id={id}
			{...rest}
		>
			{children}
		</li>
	);
};
