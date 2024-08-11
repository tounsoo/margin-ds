import {
	createContext,
	useEffect,
	useRef,
	useState,
	useMemo,
	type Dispatch,
	type SetStateAction,
	type KeyboardEvent,
} from "react";
import styles from "./Listbox.module.scss";
import cx from "classnames";
import { mergeRefs } from "../../functions";
import { ListboxItem, type ListboxItemProps } from "./ListboxItem";
import { isEqualWith } from "lodash";
import type { BaseComponentProps } from "../../types";

type ListboxContextType = {
	focusedItem?: string | null;
	setFocusedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectedItem?: string | null | undefined;
	setSelectedItem?: Dispatch<SetStateAction<string | null | undefined>>;
	selectable?: boolean;
	controlled?: boolean;
	onSelectionChange?: ListboxProps["onSelectionChange"];
};

export const ListContext = createContext<ListboxContextType>({});

export type ListboxProps = BaseComponentProps<"ul"> & {
	defaultSelected?: string;
	selected?: string | null;
	onSelectionChange?: (data?: { selected?: string }) => void;
	focusedItem?: string;
	pseudoFocusVisible?: boolean;
};

type ItemLabelType = {
	value: ListboxItemProps["value"];
	id: string;
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
	const counter = useRef(0);
	const [focusedItem, setFocusedItem] = useState<string | null>();
	const [itemArr, setItemArr] = useState<ItemLabelType[]>();
	const [selectedItem, setSelectedItem] = useState<string | null | undefined>(
		defaultSelected,
	);
	const [searchString, setSearchString] = useState("");
	const [result, setResult] = useState<ItemLabelType[]>();

	const classNames = cx(styles.listbox, className, {
		[styles["pseudo-focus-visible"]]: pseudoFocusVisible,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setTimeout(() => setSearchString(""), 500);
		return () => clearTimeout(timer);
	}, [searchString]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!itemArr) return;
		if (!searchString) return;
		const newResult = itemArr.filter((item) =>
			item.value.toLowerCase().startsWith(searchString.toLowerCase()),
		);
		if (!newResult?.length) return;
		
		const sameResult =
			result?.length === newResult.length &&
			isEqualWith(result, newResult) && searchString.length === 1;

		if (sameResult) {
			counter.current++;
			if (newResult.length === 1 || newResult.length <= counter.current) {
				counter.current = 0;
			}
		} else {
			counter.current = 0;
		}

		setFocusedItem(newResult[counter.current].id);
		setResult(newResult);
	}, [itemArr, searchString]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Inital render
	useEffect(() => {
		if (!elRef.current) return;
		const items = elRef.current.querySelectorAll(
			'li:not([aria-disabled="true"])',
		);
		const itemArr = Array.from(items).map((item) => {
			return {
				id: item.getAttribute("id") ?? "",
				value: item.getAttribute("value") ?? "",
			} satisfies ItemLabelType;
		});

		setItemArr(itemArr);
		setFocusedItem(focusedItemProp ?? defaultSelected ?? itemArr[0].id);
	}, [children]);

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

	const thisIndex =
		(focusedItem &&
			itemArr?.findIndex((item) => item.id === focusedItem)) ||
		0;
	const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
		onKeyDown?.(e);
		if (/^[a-zA-Z0-9]$/.test(e.key)) {
			setSearchString((prev) => prev + e.key);
		}
		if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.code)) {
			e.preventDefault();
			e.stopPropagation();
		}
		if (e.code === "ArrowDown") {
			if (focusedItemProp) return;
			if (itemArr?.[thisIndex + 1]) {
				setFocusedItem?.(itemArr[thisIndex + 1].id);
				return;
			}
			setFocusedItem?.(itemArr?.[0].id);
		}
		if (e.code === "ArrowUp") {
			if (focusedItemProp) return;
			if (itemArr?.[thisIndex - 1]) {
				setFocusedItem?.(itemArr[thisIndex - 1].id);
				return;
			}
			setFocusedItem?.(itemArr?.[itemArr.length - 1].id);
		}
		if (e.code === "Home") {
			if (focusedItemProp) return;
			setFocusedItem?.(itemArr?.[0].id);
		}
		if (e.code === "End") {
			if (focusedItemProp) return;
			setFocusedItem?.(itemArr?.[thisIndex - 1].id);
		}
		if (e.code === "Space") {
			if (selected) return;
			if (focusedItem === selectedItem) {
				setSelectedItem?.(undefined);
				onSelectionChange?.(undefined);
				return;
			}
			setSelectedItem?.(focusedItem ?? undefined);
			focusedItem && onSelectionChange?.({ selected: focusedItem });
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

Listbox.Item = ListboxItem;
