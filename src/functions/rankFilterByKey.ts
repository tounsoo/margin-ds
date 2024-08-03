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

type WithRelevance<T> = T & { relevance?: number };

export function rankFilterByKey<T>(
	arr: WithRelevance<T>[],
	searchString: string,
	keys: (keyof T)[],
): T[] {
	const searchPattern = new RegExp(searchString, "i");

	function computeRelevance(item: WithRelevance<T>): number {
		let score = 0;
		keys.forEach((key, index) => {
			if (item[key]) {
				const match = item[key].toString().match(searchPattern);
				if (match) {
					const matchIndex = item[key]
						.toString()
						.search(searchPattern);
					const positionScore = Math.max(
						10 - index * 2 - Math.floor(matchIndex / 10),
						0,
					);
					score += positionScore;
				}
			}
		});

		return score;
	}

	for (const item of arr) {
		item.relevance = computeRelevance(item);
	}

	// Filter out items with relevance score of 0
	const filteredArr = arr.filter((item) => (item.relevance ?? 0) > 0);

	// Sort by relevance in descending order
	filteredArr.sort((a, b) => (b.relevance ?? 0) - (a.relevance ?? 0));

	// Return items without the relevance property
	return filteredArr.map(({ relevance, ...rest }) => rest as T);
}
