import {
	createContext,
	useEffect,
	useRef,
	useState,
	useMemo,
	type Dispatch,
	type SetStateAction,
	type KeyboardEvent,
	type FocusEvent,
    type RefObject,
} from "react";
import styles from "./Menu.module.scss";
import cx from "classnames";
import { mergeRefs } from "../../functions";
import { MenuItem, type MenuItemProps } from "./MenuItem";
import { isEqualWith } from "lodash";
import type { BaseComponentProps } from "../../types";

type MenuContextType = {
	focusedItem?: string | null;
	setFocusedItem?: Dispatch<SetStateAction<string | null | undefined>>;
    menuRef?: RefObject<HTMLUListElement | null>
};

export const MenuContext = createContext<MenuContextType>({});

export type MenuProps = BaseComponentProps<"ul"> & {
	pseudoFocusVisible?: boolean;
};

type ItemLabelType = {
	value: MenuItemProps["value"];
	id: string;
};

export const Menu = (props: MenuProps) => {
	const {
		children,
		className,
		onKeyDown,
        onBlur,
		pseudoFocusVisible,
		ref,
		...rest
	} = props;
	const elRef = useRef<HTMLUListElement>(null);
	const counter = useRef(0);
	const [focusedItem, setFocusedItem] = useState<string | null>();
	const [itemArr, setItemArr] = useState<ItemLabelType[]>();
	const [searchString, setSearchString] = useState("");
	const [result, setResult] = useState<ItemLabelType[]>();

	const classNames = cx(styles.menu, className, {
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
		setFocusedItem(itemArr[0].id);
	}, [children]);

    useEffect(() => {
        function handleToggle(e: Event) {
            if ((e as ToggleEvent).newState === 'open') {
                elRef.current?.focus();
            }
            if ((e as ToggleEvent).newState === 'closed') {
                setFocusedItem(itemArr?.[0].id);
            }
        }
        elRef.current?.addEventListener('toggle', (e) => handleToggle(e))

        return () => elRef.current?.removeEventListener('toggle', (e) => handleToggle(e))
    }, [itemArr])

	const contextValue = useMemo(() => {
		return {
			focusedItem,
			setFocusedItem,
            menuRef: elRef
		};
	}, [
		focusedItem,
	]);

	const thisIndex =
		(focusedItem &&
			itemArr?.findIndex((item) => item.id === focusedItem)) ||
		0;
    const handleBlur = (e: FocusEvent<HTMLUListElement>) => {
        onBlur?.(e);
        elRef.current?.hidePopover();
    }
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
			if (itemArr?.[thisIndex + 1]) {
				setFocusedItem?.(itemArr[thisIndex + 1].id);
				return;
			}
			setFocusedItem?.(itemArr?.[0].id);
		}
		if (e.code === "ArrowUp") {
			if (itemArr?.[thisIndex - 1]) {
				setFocusedItem?.(itemArr[thisIndex - 1].id);
				return;
			}
			setFocusedItem?.(itemArr?.[itemArr.length - 1].id);
		}
		if (e.code === "Home") {
			setFocusedItem?.(itemArr?.[0].id);
		}
		if (e.code === "End") {
			setFocusedItem?.(itemArr?.[thisIndex - 1].id);
		}
		if (e.code === "Space" || e.code === "Enter") {
            (elRef.current?.querySelector(`li[id="${focusedItem}"]`) as HTMLElement).click();
		}
	};
	return (
		<ul
			role="menu"
			className={classNames}
			onKeyDown={handleKeyDown}
            onBlur={handleBlur}
			ref={mergeRefs(ref, elRef)}
			tabIndex={-1}
			aria-activedescendant={focusedItem ?? undefined}
			{...rest}
		>
			<MenuContext.Provider value={contextValue}>
				{children}
			</MenuContext.Provider>
		</ul>
	);
};

Menu.Item = MenuItem;
