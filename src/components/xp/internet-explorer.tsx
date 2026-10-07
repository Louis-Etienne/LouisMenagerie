import {
	Link,
	useCanGoBack,
	useLocation,
	useRouter,
	useRouterState,
} from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Globe,
	House,
	RotateCw,
	Search,
	Star,
	X,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ButtonGroup,
	ButtonGroupSeparator,
} from "@/components/ui/button-group";
import {
	Menubar,
	MenubarCheckboxItem,
	MenubarContent,
	MenubarGroup,
	MenubarItem,
	MenubarLabel,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarSub,
	MenubarSubContent,
	MenubarSubTrigger,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import {
	categories,
	getPageTitle,
	projectsIn,
	SITE_HOST,
} from "@/lib/projects";
import { cn } from "@/lib/utils";
import { AddressBar } from "./address-bar";
import { useDesktop } from "./desktop-context";
import { ProjectsSidebar } from "./projects-sidebar";
import { XpDialog } from "./xp-dialog";
import { CategoryIcon, IEIcon, WindowsFlag } from "./xp-icons";
import { XpWindow } from "./xp-window";

export function InternetExplorer({ children }: { children: ReactNode }) {
	const desktop = useDesktop();
	const isMobile = useIsMobile();
	const { pathname } = useLocation();
	const scrollAnchor = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isMobile) desktop.setSidebarOpen(false);
	}, [isMobile, desktop.setSidebarOpen]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: every page change must reset the scroll position
	useEffect(() => {
		scrollAnchor.current
			?.closest("[data-slot=scroll-area-viewport]")
			?.scrollTo({ top: 0 });
		if (isMobile) desktop.setSidebarOpen(false);
	}, [pathname, isMobile, desktop.setSidebarOpen]);

	if (desktop.browser === "closed") return null;

	const pageTitle = getPageTitle(pathname);

	return (
		<XpWindow
			title={`${pageTitle} - Internet Explorer`}
			icon={<IEIcon className="size-4" />}
			minimized={desktop.browser === "minimized"}
			maximized={desktop.maximized}
			onMinimize={desktop.minimizeBrowser}
			onToggleMaximize={() => desktop.setMaximized((value) => !value)}
			onClose={desktop.closeBrowser}
		>
			<div className="xp-aged xp-grain flex min-h-0 flex-1 flex-col overflow-hidden">
				<div className="xp-chrome border-b border-[#c8bc98]">
					<BrowserMenu />
					<BrowserToolbar />
					<AddressBar />
				</div>

				<SidebarProvider
					open={desktop.sidebarOpen}
					onOpenChange={desktop.setSidebarOpen}
					className="relative min-h-0 flex-1 overflow-hidden"
				>
					{desktop.sidebarOpen && <ProjectsSidebar />}
					<SidebarInset className="papyrus min-w-0 bg-transparent">
						<ScrollArea className="min-h-0 flex-1">
							<div ref={scrollAnchor} />
							{children}
						</ScrollArea>
					</SidebarInset>
				</SidebarProvider>

				{desktop.statusBar && <StatusBar />}
			</div>
		</XpWindow>
	);
}

function BrowserMenu() {
	const desktop = useDesktop();
	const router = useRouter();
	const [aboutOpen, setAboutOpen] = useState(false);
	const loading = useRouterState({
		select: (state) => state.status === "pending",
	});

	const triggerClass =
		"rounded-none px-1.5 py-0 text-[12px] font-normal text-black hover:bg-xp-select hover:text-white aria-expanded:bg-xp-select aria-expanded:text-white";
	const contentClass =
		"min-w-48 rounded-none border border-[#aca899] bg-white p-0.5 text-black shadow-[2px_2px_4px_rgb(0_0_0/0.35)] ring-0";
	const itemClass =
		"rounded-none py-[3px] text-[12px] focus:bg-xp-select focus:text-white";

	return (
		<div className="flex items-stretch border-b border-[#c8bc98]">
			<Menubar className="h-[22px] flex-1 gap-0 rounded-none border-0 bg-transparent p-0">
				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>File</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarItem className={itemClass} disabled>
							New Window <MenubarShortcut>Ctrl+N</MenubarShortcut>
						</MenubarItem>
						<MenubarItem
							className={itemClass}
							onClick={desktop.focusAddressBar}
						>
							Open… <MenubarShortcut>Ctrl+O</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem className={itemClass} onClick={() => window.print()}>
							Print… <MenubarShortcut>Ctrl+P</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem className={itemClass} onClick={desktop.closeBrowser}>
							Close
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>Edit</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarItem className={itemClass} disabled>
							Cut <MenubarShortcut>Ctrl+X</MenubarShortcut>
						</MenubarItem>
						<MenubarItem className={itemClass} disabled>
							Copy <MenubarShortcut>Ctrl+C</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem
							className={itemClass}
							onClick={desktop.focusAddressBar}
						>
							Find (on my projects)… <MenubarShortcut>Ctrl+F</MenubarShortcut>
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>View</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarSub>
							<MenubarSubTrigger className={itemClass}>
								Explorer Bar
							</MenubarSubTrigger>
							<MenubarSubContent className={contentClass}>
								<MenubarCheckboxItem
									className={itemClass}
									checked={desktop.sidebarOpen}
									onCheckedChange={desktop.setSidebarOpen}
								>
									My Projects <MenubarShortcut>Ctrl+B</MenubarShortcut>
								</MenubarCheckboxItem>
							</MenubarSubContent>
						</MenubarSub>
						<MenubarCheckboxItem
							className={itemClass}
							checked={desktop.statusBar}
							onCheckedChange={desktop.setStatusBar}
						>
							Status Bar
						</MenubarCheckboxItem>
						<MenubarSeparator />
						<MenubarItem className={itemClass} disabled={!loading}>
							Stop <MenubarShortcut>Esc</MenubarShortcut>
						</MenubarItem>
						<MenubarItem
							className={itemClass}
							onClick={() => router.invalidate()}
						>
							Refresh <MenubarShortcut>F5</MenubarShortcut>
						</MenubarItem>
						<MenubarSeparator />
						<MenubarCheckboxItem
							className={itemClass}
							checked={desktop.maximized}
							onCheckedChange={desktop.setMaximized}
						>
							Full Screen <MenubarShortcut>F11</MenubarShortcut>
						</MenubarCheckboxItem>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>Favorites</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarItem className={itemClass} render={<Link to="/projects" />}>
							<Star className="fill-[#f7c331] text-[#c48a00]" /> All my projects
						</MenubarItem>
						<MenubarSeparator />
						{categories.map((category) => (
							<MenubarSub key={category.id}>
								<MenubarSubTrigger className={itemClass}>
									<CategoryIcon category={category.id} />
									{category.label}
								</MenubarSubTrigger>
								<MenubarSubContent className={contentClass}>
									<MenubarGroup>
										<MenubarLabel className="text-[11px]">
											{category.label}
										</MenubarLabel>
										{projectsIn(category.id).map((project) => (
											<MenubarItem
												key={project.to}
												className={itemClass}
												render={<Link to={project.to} />}
											>
												<IEIcon className="size-4" />
												{project.title}
											</MenubarItem>
										))}
									</MenubarGroup>
								</MenubarSubContent>
							</MenubarSub>
						))}
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>Tools</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarItem className={itemClass} disabled>
							Mail and News
						</MenubarItem>
						<MenubarItem className={itemClass} disabled>
							Pop-up Blocker
						</MenubarItem>
						<MenubarSeparator />
						<MenubarItem className={itemClass} disabled>
							Internet Options…
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>

				<MenubarMenu>
					<MenubarTrigger className={triggerClass}>Help</MenubarTrigger>
					<MenubarContent className={contentClass}>
						<MenubarItem
							className={itemClass}
							onClick={() => setAboutOpen(true)}
						>
							About Internet Explorer
						</MenubarItem>
					</MenubarContent>
				</MenubarMenu>
			</Menubar>

			<div className="flex w-[38px] items-center justify-center border-l border-[#c8bc98] bg-white">
				<WindowsFlag className={cn("size-6", loading && "animate-pulse")} />
			</div>

			<XpDialog
				open={aboutOpen}
				onOpenChange={setAboutOpen}
				title="About Internet Explorer"
				icon={<IEIcon className="size-4" />}
			>
				<div className="-mx-4 -mt-4 mb-3 flex items-center gap-3 bg-[linear-gradient(135deg,#0b3fa8,#3d86e8)] px-4 py-5 text-white">
					<IEIcon className="size-12" />
					<div>
						<p className="font-display text-xl leading-tight">
							<sup>®</sup> Internet Explorer
						</p>
						<p className="text-[11px] opacity-80">Louis' Menagerie Edition</p>
					</div>
				</div>
				<p>Version: 6.0.2900.2180 (papyrus SP2)</p>
				<p className="mt-2">
					A loving reconstruction built with React, TanStack Start, Tailwind CSS
					and shadcn/ui. No real Internet Explorers were harmed.
				</p>
			</XpDialog>
		</div>
	);
}

function ToolbarButton({
	label,
	showLabel,
	disabled,
	onClick,
	children,
}: {
	label: string;
	showLabel?: boolean;
	disabled?: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<Button
						variant="ghost"
						aria-label={label}
						disabled={disabled}
						onClick={onClick}
						className="xp-toolbar-btn"
					/>
				}
			>
				{children}
				{showLabel && <span className="hidden sm:inline">{label}</span>}
			</TooltipTrigger>
			<TooltipContent side="bottom">{label}</TooltipContent>
		</Tooltip>
	);
}

function BrowserToolbar() {
	const router = useRouter();
	const canGoBack = useCanGoBack();
	const [hydrated, setHydrated] = useState(false);
	useEffect(() => setHydrated(true), []);
	const desktop = useDesktop();
	const loading = useRouterState({
		select: (state) => state.status === "pending",
	});

	return (
		<div className="flex items-center gap-0.5 overflow-x-auto border-b border-[#c8bc98] px-1 py-0.5">
			<ButtonGroup className="gap-0.5 *:rounded-[3px]! [&>[data-slot]~[data-slot]]:border-l!">
				<ToolbarButton
					label="Back"
					showLabel
					disabled={!hydrated || !canGoBack}
					onClick={() => router.history.back()}
				>
					<span className="xp-nav-orb">
						<ArrowLeft className="size-4" strokeWidth={3} />
					</span>
				</ToolbarButton>
				<ToolbarButton label="Forward" onClick={() => router.history.forward()}>
					<span className="xp-nav-orb">
						<ArrowRight className="size-4" strokeWidth={3} />
					</span>
				</ToolbarButton>
			</ButtonGroup>
			<ButtonGroupSeparator className="mx-1 h-7 bg-[#c8bc98]" />
			<ButtonGroup className="gap-0.5 *:rounded-[3px]! [&>[data-slot]~[data-slot]]:border-l!">
				<ToolbarButton
					label="Stop"
					disabled={!loading}
					onClick={() => window.stop()}
				>
					<span className="flex size-6 items-center justify-center rounded-[3px] bg-[linear-gradient(180deg,#f47d6b,#cf2a12)] text-white shadow-[inset_0_-1px_1px_rgb(0_0_0/0.25)]">
						<X className="size-4" strokeWidth={3} />
					</span>
				</ToolbarButton>
				<ToolbarButton label="Refresh" onClick={() => router.invalidate()}>
					<RotateCw className="size-5! text-[#2e8b20]" strokeWidth={2.5} />
				</ToolbarButton>
				<ToolbarButton
					label="Home"
					onClick={() => router.navigate({ to: "/projects" })}
				>
					<House className="size-5! fill-[#f6e7b6] text-[#7a5a14]" />
				</ToolbarButton>
			</ButtonGroup>
			<ButtonGroupSeparator className="mx-1 h-7 bg-[#c8bc98]" />
			<ButtonGroup className="gap-0.5 *:rounded-[3px]! [&>[data-slot]~[data-slot]]:border-l!">
				<ToolbarButton
					label="Search"
					showLabel
					onClick={desktop.focusAddressBar}
				>
					<Search className="size-5! text-[#1f5fc4]" strokeWidth={2.5} />
				</ToolbarButton>
				<ToolbarButton
					label="Favorites"
					showLabel
					onClick={() => desktop.setSidebarOpen(!desktop.sidebarOpen)}
				>
					<Star className="size-5! fill-[#f7c331] text-[#b07a00]" />
				</ToolbarButton>
			</ButtonGroup>
		</div>
	);
}

const PROGRESS_SEGMENTS = Array.from({ length: 10 }, (_, index) => index);

function StatusBar() {
	const { pathname } = useLocation();
	const loading = useRouterState({
		select: (state) => state.status === "pending",
	});

	return (
		<div className="flex h-[22px] shrink-0 items-center gap-1 border-t border-white bg-xp-chrome px-1 text-[11px] text-black shadow-[inset_0_1px_#c8bc98]">
			<IEIcon className="size-3.5 shrink-0" />
			<span className="min-w-0 flex-1 truncate">
				{loading ? `Opening page ${SITE_HOST}${pathname}…` : "Done"}
			</span>
			{loading && (
				<div className="hidden h-3 w-28 gap-px border border-[#a0a0a0] bg-white p-px sm:flex">
					{PROGRESS_SEGMENTS.map((segment) => (
						<span
							key={segment}
							className="h-full flex-1 animate-pulse bg-[#2fa52f]"
							style={{ animationDelay: `${segment * 80}ms` }}
						/>
					))}
				</div>
			)}
			<Separator orientation="vertical" className="mx-1 h-4 bg-[#c8bc98]" />
			<span className="hidden w-32 items-center gap-1 sm:flex">
				<Globe className="size-3.5 text-[#1f5fc4]" />
				Internet
			</span>
		</div>
	);
}
