import type { SetFieldType, SetRequired } from "type-fest";

type VetoOption = {
	inlineStart?: never;
	blockEnd?: never;
	blockStart?: never;
	inlineEnd?: never;
};

export type A11yProps = {
	level?: "AA" | "AAA";
	clear?:
		| SetRequired<
				SetFieldType<VetoOption, "inlineStart", true>,
				"inlineStart"
		  >
		| SetRequired<
				SetFieldType<VetoOption, "inlineStart" | "blockStart", true>,
				"inlineStart" | "blockStart"
		  >
		| SetRequired<
				SetFieldType<VetoOption, "inlineStart" | "blockEnd", true>,
				"inlineStart" | "blockEnd"
		  >
		| SetRequired<SetFieldType<VetoOption, "inlineEnd", true>, "inlineEnd">
		| SetRequired<
				SetFieldType<VetoOption, "inlineEnd" | "blockStart", true>,
				"inlineEnd" | "blockStart"
		  >
		| SetRequired<
				SetFieldType<VetoOption, "inlineEnd" | "blockEnd", true>,
				"inlineEnd" | "blockEnd"
		  >
		| SetRequired<
				SetFieldType<VetoOption, "blockStart", true>,
				"blockStart"
		  >
		| SetRequired<SetFieldType<VetoOption, "blockEnd", true>, "blockEnd">;
};
