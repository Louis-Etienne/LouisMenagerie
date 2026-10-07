import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useMemo,
	useState,
} from "react";

export type WindowState = "open" | "minimized" | "closed";
export type PowerState = "on" | "off" | "welcome";

interface DesktopContextValue {
	browser: WindowState;
	maximized: boolean;
	sidebarOpen: boolean;
	statusBar: boolean;
	power: PowerState;
	openBrowser: () => void;
	minimizeBrowser: () => void;
	closeBrowser: () => void;
	toggleBrowserFromTaskbar: () => void;
	setMaximized: (value: boolean | ((prev: boolean) => boolean)) => void;
	setSidebarOpen: (value: boolean) => void;
	setStatusBar: (value: boolean) => void;
	setPower: (value: PowerState) => void;
	focusAddressBar: () => void;
	registerAddressBar: (focus: () => void) => void;
}

const DesktopContext = createContext<DesktopContextValue | null>(null);

export function DesktopProvider({ children }: { children: ReactNode }) {
	const [browser, setBrowser] = useState<WindowState>("open");
	const [maximized, setMaximized] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [statusBar, setStatusBar] = useState(true);
	const [power, setPower] = useState<PowerState>("on");
	const [addressBarFocus, setAddressBarFocus] = useState<() => void>(
		() => () => {},
	);

	const openBrowser = useCallback(() => setBrowser("open"), []);
	const minimizeBrowser = useCallback(() => setBrowser("minimized"), []);
	const closeBrowser = useCallback(() => setBrowser("closed"), []);
	const toggleBrowserFromTaskbar = useCallback(
		() => setBrowser((state) => (state === "open" ? "minimized" : "open")),
		[],
	);
	const registerAddressBar = useCallback(
		(focus: () => void) => setAddressBarFocus(() => focus),
		[],
	);
	const focusAddressBar = useCallback(() => {
		setBrowser("open");
		requestAnimationFrame(() => addressBarFocus());
	}, [addressBarFocus]);

	const value = useMemo(
		() => ({
			browser,
			maximized,
			sidebarOpen,
			statusBar,
			power,
			openBrowser,
			minimizeBrowser,
			closeBrowser,
			toggleBrowserFromTaskbar,
			setMaximized,
			setSidebarOpen,
			setStatusBar,
			setPower,
			focusAddressBar,
			registerAddressBar,
		}),
		[
			browser,
			maximized,
			sidebarOpen,
			statusBar,
			power,
			openBrowser,
			minimizeBrowser,
			closeBrowser,
			toggleBrowserFromTaskbar,
			focusAddressBar,
			registerAddressBar,
		],
	);

	return (
		<DesktopContext.Provider value={value}>{children}</DesktopContext.Provider>
	);
}

export function useDesktop() {
	const context = useContext(DesktopContext);
	if (!context) {
		throw new Error("useDesktop must be used within a DesktopProvider.");
	}
	return context;
}
