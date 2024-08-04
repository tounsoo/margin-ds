import { useState, useEffect } from "react";
import { rankFilterByKey, type WithRelevance } from "../../functions";

export type UseTypeaheadProps<T> = {
	data: WithRelevance<T>[];
	keys: (keyof T)[];
};

export const useTypeahead = <T>({
	data,
	keys,
}: UseTypeaheadProps<T>): {
	result: T[];
	updateSearchString: (char: string) => void;
} => {
	const [searchString, setSearchString] = useState("");
	const [result, setResult] = useState<T[]>([]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (typeof searchString === "undefined") {
			return;
		}

		if (searchString.length === 0) {
			setResult([]);
			return;
		}
		const newResult = rankFilterByKey({
			data,
			searchString,
			keys,
		});
		setResult(newResult);
	}, [searchString]);

	const updateSearchString = (char: string) => {
		setSearchString(char);
	};

	return {
		result,
		updateSearchString,
	};
};
