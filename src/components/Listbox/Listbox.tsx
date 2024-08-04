import {
	createContext,
	useEffect,
	useRef,
	useState,
	useMemo,
    Children,
	type Dispatch,
	type SetStateAction,
	type ComponentPropsWithRef,
	type KeyboardEvent,
    type ReactElement,
} from "react";
import styles from "./Listbox.module.scss";
import cx from "classnames";
import { getLabel, mergeRefs, rankFilterByKey, type WithRelevance } from "../../functions";
import { ListboxItem } from "./ListboxItem";
import { isEqualWith } from "lodash";

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

export type ListboxProps = ComponentPropsWithRef<"ul"> & {
	defaultSelected?: string;
	selected?: string | null;
	onSelectionChange?: (data?: { selection?: string }) => void;
	focusedItem?: string;
	pseudoFocusVisible?: boolean;
};

type ItemLabelType = {
    text: string
}

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
	const [itemArr, setItemArr] = useState<(string | null)[]>();
    const [itemLabelArr, setItemLabelArr] = useState<WithRelevance<ItemLabelType>[]>();
	const [focusedItem, setFocusedItem] = useState<string | null>();
	const [selectedItem, setSelectedItem] = useState<string | null | undefined>(
		defaultSelected,
	);
    const [searchString, setSearchString] = useState("");
    const [result, setResult] = useState<WithRelevance<ItemLabelType>[]>();

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
        if (!itemLabelArr) return;
        if (!searchString) return;
        const newResult = rankFilterByKey({
			data: itemLabelArr,
			searchString,
			keys: ['text'],
		});

		if (!newResult.length) {
			return;
		}

        const sameResult = result?.length === newResult.length && isEqualWith(
			result,
			newResult,
		);

        if (sameResult && searchString.length === 1) {
            counter.current++;
			if (newResult.length === 1) {
                counter.current = 0;
                setFocusedItem(newResult[0].id);
				return;
			}
			if (newResult.length <= counter.current) {
                counter.current = 0;
				setFocusedItem(newResult[0].id);
				return;
			}
            setFocusedItem(newResult[counter.current].id);
			return;
		}
		counter.current = 0;
        setFocusedItem(newResult[0].id);
		setResult(newResult);
    }, [itemLabelArr, searchString])
    
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
        const result = (Children.toArray(children) as ReactElement[]).map((child) => {
            return {
                id: (child.props as object & {id: string}).id,
                text: getLabel(child)
            };
        })
        setItemLabelArr(result);
    }, [children])

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

Listbox.Item = ListboxItem;