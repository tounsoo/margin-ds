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

// const sorted = sortByKey(data, [
//     { key: "name", order: "asc" },
//     { key: "id", order: "desc" },
// ]);

type SortOrder = "asc" | "desc";

type SortCriteria<T> = {
	key: keyof T;
	order: SortOrder;
};

export function sortByKey<T>(array: T[], criteria: SortCriteria<T>[]): T[] {
	return array.slice().sort((a, b) => {
		for (const { key, order } of criteria) {
			if (a[key] < b[key]) {
				return order === "asc" ? -1 : 1;
			}
			if (a[key] > b[key]) {
				return order === "asc" ? 1 : -1;
			}
		}
		return 0;
	});
}
