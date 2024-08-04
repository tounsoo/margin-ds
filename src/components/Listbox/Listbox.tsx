import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	useMemo,
	type Dispatch,
	type SetStateAction,
	type ComponentPropsWithRef,
	type KeyboardEvent,
	type MouseEvent,
} from "react";
import styles from "./Listbox.module.scss";
import cx from "classnames";
import type { SetRequired } from "type-fest";
import { mergeRefs } from "../../functions";

type ListboxContextType = {
	focusedItem?: string | null;
	setFocusedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectedItem?: string | null | undefined;
	setSelectedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectable?: boolean;
	controlled?: boolean;
	onSelectionChange?: ListboxProps["onSelectionChange"];
};

const ListContext = createContext<ListboxContextType>({});

export type ListboxProps = ComponentPropsWithRef<"ul"> & {
	defaultSelected?: string;
	selected?: string | null;
	onSelectionChange?: (data?: { selection?: string }) => void;
	focusedItem?: string;
	pseudoFocusVisible?: boolean;
};

export const Listbox = (props: ListboxProps) => {
	const {
		children,
		className,
		defaultSelected,
		selected,
		onSelectionChange,
		onKeyDown,
		pseudoFocusVisible,
		focusedItem: focusedItemProp,
        ref,
		...rest
	} = props;
	const elRef = useRef<HTMLUListElement>(null);
	const [itemArr, setItemArr] = useState<(string | null)[]>();
	const [focusedItem, setFocusedItem] = useState<string | null>();
	const [selectedItem, setSelectedItem] = useState<string | null | undefined>(
		defaultSelected,
	);
	const classNames = cx(styles.listbox, className, {
		[styles["pseudo-focus-visible"]]: pseudoFocusVisible,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: Inital render
	useEffect(() => {
		if (!elRef.current) return;
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
		if (typeof focusedItemProp === "undefined") return;
		setFocusedItem(focusedItemProp);
	}, [focusedItemProp]);

	useEffect(() => {
		if (typeof selected === "undefined") return;
		setSelectedItem(selected);
	}, [selected]);

	const contextValue = useMemo(() => {
		return {
			focusedItem,
			setFocusedItem,
			selectedItem,
			setSelectedItem,
			onSelectionChange,
			controlled: !!selected || !!focusedItemProp,
		};
	}, [
		focusedItem,
		focusedItemProp,
		selectedItem,
		selected,
		onSelectionChange,
	]);

	const thisIndex = (focusedItem && itemArr?.indexOf(focusedItem)) || 0;
	const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
		onKeyDown?.(e);
		if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.code)) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (e.code === "ArrowDown") {
			if (focusedItemProp) return;
			if (itemArr?.[thisIndex + 1]) {
				setFocusedItem?.(itemArr[thisIndex + 1]);
				return;
			}
			setFocusedItem?.(itemArr?.[0]);
		}
		if (e.code === "ArrowUp") {
			if (focusedItemProp) return;
			if (itemArr?.[thisIndex - 1]) {
				setFocusedItem?.(itemArr[thisIndex - 1]);
				return;
			}
			setFocusedItem?.(itemArr?.[itemArr.length - 1]);
		}
		if (e.code === "Home") {
			if (focusedItemProp) return;
			setFocusedItem?.(itemArr?.[0]);
		}
		if (e.code === "End") {
			if (focusedItemProp) return;
			setFocusedItem?.(itemArr?.[thisIndex - 1]);
		}
		if (e.code === "Space") {
			if (selected) return;
			if (focusedItem === selectedItem) {
				setSelectedItem?.(undefined);
				onSelectionChange?.(undefined);
				return;
			}
			setSelectedItem?.(focusedItem ?? undefined);
			focusedItem && onSelectionChange?.({ selection: focusedItem });
		}
	};
	return (
		<ul
			// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: <explanation>
			role="listbox"
			className={classNames}
			onKeyDown={handleKeyDown}
			ref={mergeRefs(ref, elRef)}
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

export type ListboxItemProps = Omit<
	SetRequired<ComponentPropsWithRef<"li">, "id">,
	"onClick" | "onMouseEnter"
> & {
	onClick?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
	onMouseEnter?: (data: { id: string }, e: MouseEvent<HTMLLIElement>) => void;
};

Listbox.Item = (props: ListboxItemProps) => {
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
