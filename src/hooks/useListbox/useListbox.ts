import { useState, useEffect, useRef, type KeyboardEvent } from "react";
import { rankFilterByKey, type WithRelevance } from "../../functions";
import { isEqualWith } from "lodash";

export type UseListProps<T> = {
	data: WithRelevance<T>[];
	keys: (keyof T)[];
};

export const useList = <T>({
	data,
	keys,
}: UseListProps<T>): {
	result: T[];
	focusItem: T;
	handleKeyDown: (e: KeyboardEvent<HTMLUListElement>) => void;
} => {
	const [searchString, setSearchString] = useState("");
	const [result, setResult] = useState<T[]>(data);
	const [focusItem, setFocusItem] = useState<T>(data[0]);
	const counter = useRef(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const timer = setTimeout(() => setSearchString(""), 500);
		return () => clearTimeout(timer);
	}, [searchString]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof searchString === "undefined") return;
		const newResult = rankFilterByKey({
			data,
			searchString,
			keys,
			preserveOrder: true,
		});

		if (!newResult.length) return;

		const sameResult = isEqualWith(
			newResult,
			result,
			(value1, value2, key) => {
				return key === "relevance" ? undefined : true;
			},
		);

		if (sameResult) {
			if (counter.current === newResult.length - 1) {
				counter.current = 0;
			} else {
				counter.current++;
			}
			setResult(newResult);
			setFocusItem(newResult[counter.current]);
			return;
		}

		counter.current = 0;
		setResult(newResult);
		setFocusItem(newResult[0]);
	}, [searchString]);

	const handleKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
		if (/^[a-zA-Z0-9]$/.test(e.key)) {
			setSearchString((prev) => {
				return prev + e.key;
			});
		}
	};

	return {
		result,
		handleKeyDown,
		focusItem,
	};
};
