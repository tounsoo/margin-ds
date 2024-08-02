import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	useMemo,
	type Dispatch,
	type SetStateAction,
	type ComponentProps,
	type KeyboardEvent,
	type MouseEvent,
} from "react";
import styles from "./List.module.scss";
import cx from "classnames";
import type { SetRequired } from "type-fest";

type ListContextType = {
	focusedItem?: string | null;
	setFocusedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectedItem?: string | null;
	setSelectedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectable?: boolean;
    controlled?: boolean;
	onSelectionChange?: ListProps["onSelectionChange"];
};

const ListContext = createContext<ListContextType>({});

export type ListProps = ComponentProps<"ul"> &
	(
		| {
				selectable?: never;
				defaultSelected?: never;
				selected?: never;
				onSelectionChange?: never;
                focusedItem?: never;
                pseudoFocus?: never;
		  }
		| {
				selectable: true;
				defaultSelected?: string;
				selected?: string;
				onSelectionChange?: (value?: string) => void;
                focusedItem?: string;
                pseudoFocus?: boolean;
		  }
	);

export const List = (props: ListProps) => {
	const {
		children,
		className,
		defaultSelected,
        selected,
		onSelectionChange,
		selectable,
		onKeyDown,
        pseudoFocus,
        focusedItem: focusedItemProp,
		...rest
	} = props;
	const elRef = useRef<HTMLUListElement>(null);
	const [itemArr, setItemArr] = useState<(string | null)[]>();
	const [focusedItem, setFocusedItem] = useState<string | null>();
	const [selectedItem, setSelectedItem] = useState<string | null>();
	const classNames = cx(styles.list, className, {
        [styles['pseudo-focus']]: pseudoFocus
    });

	// biome-ignore lint/correctness/useExhaustiveDependencies: Inital render
	useEffect(() => {
		if (!elRef.current) return;
		if (!selectable) return;
		const items = elRef.current.querySelectorAll(
			'li:not([aria-disabled="true"])',
		);
		const itemValues = Array.from(items).map((item) =>
			item.getAttribute("id"),
		);
		setItemArr(itemValues);
		setFocusedItem(focusedItemProp ?? defaultSelected ?? itemValues[0]);
	}, []);

    useEffect(() => {
        if (typeof focusedItemProp === 'undefined') return;
        setFocusedItem(focusedItemProp);
    }, [focusedItemProp])
   
    useEffect(() => {
        // if (typeof selected === 'undefined') return;
        setSelectedItem(selected);
    }, [selected])

	const contextValue = useMemo(() => {
		return {
			focusedItem,
			setFocusedItem,
			selectedItem,
			setSelectedItem,
			selectable,
			onSelectionChange,
            controlled: !!selected
		};
	}, [focusedItem, selectedItem, selected, selectable, onSelectionChange]);

	const thisIndex = (focusedItem && itemArr?.indexOf(focusedItem)) || 0;
	const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
		onKeyDown?.(e);
		if (!selectable) return;

        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.code)) {
            e.preventDefault();
			e.stopPropagation();
        }
		if (e.code === "ArrowDown") {
			if (itemArr?.[thisIndex + 1]) {
				setFocusedItem?.(itemArr[thisIndex + 1]);
				return;
			}
			setFocusedItem?.(itemArr?.[0]);
		}
		if (e.code === "ArrowUp") {
			if (itemArr?.[thisIndex - 1]) {
				setFocusedItem?.(itemArr[thisIndex - 1]);
				return;
			}
			setFocusedItem?.(itemArr?.[itemArr.length - 1]);
		}
		if (e.code === "Home") {
			setFocusedItem?.(itemArr?.[0]);
		}
		if (e.code === "End") {
			setFocusedItem?.(itemArr?.[thisIndex - 1]);
		}
		if (e.code === "Space") {
            if (selected) return;
			if (focusedItem === selectedItem) {
				setSelectedItem?.(undefined);
				onSelectionChange?.(undefined);
				return;
			}
			setSelectedItem?.(focusedItem);
			focusedItem && onSelectionChange?.(focusedItem);
		}
	};
	return (
		<ul
			role={selectable ? "listbox" : "list"}
			className={classNames}
			onKeyDown={handleKeyDown}
			ref={elRef}
			tabIndex={0}
			aria-activedescendant={focusedItem ?? undefined}
			{...rest}
		>
			<ListContext.Provider value={contextValue}>
				{children}
			</ListContext.Provider>
		</ul>
	);
};

export type ListItemProps = SetRequired<ComponentProps<"li">, "id">;

List.Item = (props: ListItemProps) => {
	const { children, className, id, onClick, ...rest } = props;
	const {
		focusedItem,
		setFocusedItem,
		selectedItem,
		setSelectedItem,
		selectable,
		onSelectionChange,
        controlled
	} = useContext(ListContext);
	const classNames = cx(styles["list-item"], className);

	const handleClick = (e: MouseEvent<HTMLLIElement>) => {
		onClick?.(e);
		if (!selectable) return;
        if (controlled) return;
		if (selectedItem === id) {
			setFocusedItem?.(undefined);
			setSelectedItem?.(undefined);
			onSelectionChange?.(undefined);
			return;
		}
		setFocusedItem?.(id);
		setSelectedItem?.(id);
		onSelectionChange?.(id);
	};

	return (
		<li
			className={classNames}
			data-focused={focusedItem === id}
			onClick={handleClick}
			aria-selected={selectable && selectedItem === id}
			id={id}
			{...rest}
		>
			{children}
		</li>
	);
};
