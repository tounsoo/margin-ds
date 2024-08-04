// Example:
//
// const data = [
//     {
//         name: "Ben",
//         id: "111",
//         status: "sleepy",
//         description: "hello world part 1",
//     },
//     {
//         name: "Bezne",
//         id: "2222",
//         status: "helping",
//         description: "hellow world part 2",
//     },
//     {
//         name: "Michael",
//         id: "3333",
//         status: "helping James",
//         description: "what is this?",
//     },
//     {
//         name: "James",
//         id: "4444",
//         status: "no idea",
//         description: " search is fun",
//     },
// ];

// const result = rankFilterByKey(data, "be", [
//     "name",
//     "status",
//     "description",
// ]);

export type WithRelevance<T> = T & { relevance?: number; id: string };

export type RankFilterByKeyProps<T> = {
	data: WithRelevance<T>[];
	searchString: string;
	keys: (keyof T)[];
	preserveOrder?: boolean;
};

export function rankFilterByKey<T>(
	props: RankFilterByKeyProps<T>,
): WithRelevance<T>[] {
	const { data, searchString, keys, preserveOrder } = props;
	const searchPattern = new RegExp(searchString, "i");

	// Function to compute relevance score
	function computeRelevance(item: WithRelevance<T>): number {
		let score = 0;

		// biome-ignore lint/complexity/noForEach: <explanation>
		keys.forEach((key) => {
			const value = item[key];
			if (typeof value === "string") {
				const match = value.match(searchPattern);
				if (match) {
					// Calculate the position score based on the match index
					const matchIndex = value.search(searchPattern);
					const positionScore = Math.max(100 - matchIndex, 0); // Higher score for earlier matches
					score += positionScore;
				}
			}
		});

		return score;
	}

	// Calculate relevance for each item
	// biome-ignore lint/complexity/noForEach: <explanation>
	data.forEach((item) => {
		item.relevance = computeRelevance(item);
	});

	// Filter items with relevance greater than 0
	const filteredArr = data.filter((item) => (item.relevance ?? 0) > 0);

	// Return results either in original or sorted order based on preserveOrder flag
	return preserveOrder
		? filteredArr
		: filteredArr.sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0));
}
