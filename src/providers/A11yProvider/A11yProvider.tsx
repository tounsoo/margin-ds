import { createContext, useContext, type ReactNode } from "react";

export type A11yProviderProps = {
	children: ReactNode;
	level: "AA" | "AAA";
};

const A11yContext = createContext({
	level: "AA" as A11yProviderProps["level"],
});

export const A11yProvider = ({ children, level }: A11yProviderProps) => {
	const value = {
		level,
	};
	return (
		<A11yContext.Provider value={value}>{children}</A11yContext.Provider>
	);
};

export const useA11y = () => {
	return useContext(A11yContext);
};
