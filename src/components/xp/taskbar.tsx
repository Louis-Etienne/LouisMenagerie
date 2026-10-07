import { useLocation } from "@tanstack/react-router";
import { Info, Monitor, ShieldCheck, Volume2, Wifi, X } from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverTitle,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPageTitle } from "@/lib/projects";
import { useDesktop } from "./desktop-context";
import { StartMenu } from "./start-menu";
import { IEIcon } from "./xp-icons";

export function Taskbar() {
	const desktop = useDesktop();
	const { pathname } = useLocation();
	const title = getPageTitle(pathname);

	return (
		<footer className="xp-taskbar absolute inset-x-0 bottom-0 z-40 flex h-[30px] items-stretch select-none">
			<StartMenu />

			<div className="ml-2 hidden items-center gap-0.5 border-r border-[#1941a5] pr-2 shadow-[1px_0_#3c81f3] sm:flex">
				<QuickLaunch
					label="Launch Internet Explorer"
					onClick={desktop.openBrowser}
				>
					<IEIcon className="size-[18px]" />
				</QuickLaunch>
				<QuickLaunch label="Show Desktop" onClick={desktop.minimizeBrowser}>
					<Monitor className="size-[18px] text-[#d8e8ff]" />
				</QuickLaunch>
			</div>

			<div className="flex min-w-0 flex-1 items-center gap-1 px-1.5">
				{desktop.browser !== "closed" && (
					<Tooltip>
						<TooltipTrigger
							render={
								<button
									type="button"
									data-active={desktop.browser === "open"}
									onClick={desktop.toggleBrowserFromTaskbar}
									className="xp-task w-[min(180px,40vw)]"
								/>
							}
						>
							<IEIcon className="size-4 shrink-0" />
							<span className="truncate">
								{title} - Internet Explorer
							</span>
						</TooltipTrigger>
						<TooltipContent side="top">
							{title} - Internet Explorer
						</TooltipContent>
					</Tooltip>
				)}
			</div>

			<SystemTray />
		</footer>
	);
}

function QuickLaunch({
	label,
	onClick,
	children,
}: {
	label: string;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={
					<button
						type="button"
						aria-label={label}
						onClick={onClick}
						className="flex size-[22px] items-center justify-center rounded-[3px] hover:bg-white/20 hover:shadow-[inset_0_0_0_1px_rgb(255_255_255/0.35)]"
					/>
				}
			>
				{children}
			</TooltipTrigger>
			<TooltipContent side="top">{label}</TooltipContent>
		</Tooltip>
	);
}

function SystemTray() {
	const { focusAddressBar } = useDesktop();
	const [now, setNow] = useState<Date | null>(null);
	const [balloonOpen, setBalloonOpen] = useState(false);

	useEffect(() => {
		setNow(new Date());
		const tick = setInterval(() => setNow(new Date()), 15_000);
		const show = setTimeout(() => setBalloonOpen(true), 1800);
		const hide = setTimeout(() => setBalloonOpen(false), 14_000);
		return () => {
			clearInterval(tick);
			clearTimeout(show);
			clearTimeout(hide);
		};
	}, []);

	const trayIcons = [
		{ label: "Volume", icon: <Volume2 className="size-4" /> },
		{
			label: "Wireless Network Connection: Connected",
			icon: <Wifi className="size-4" />,
		},
		{
			label: "Your computer is protected (mostly)",
			icon: <ShieldCheck className="size-4" />,
		},
	];

	return (
		<div className="xp-tray flex shrink-0 items-center gap-1.5 px-2.5 text-white">
			<Popover open={balloonOpen} onOpenChange={setBalloonOpen}>
				<PopoverTrigger
					render={
						<button
							type="button"
							aria-label="Show welcome tip"
							className="flex items-center rounded-full"
						/>
					}
				>
					<Info className="size-4 text-[#ffe48a]" />
				</PopoverTrigger>
				<PopoverContent
					side="top"
					align="end"
					sideOffset={10}
					className="w-[min(320px,90vw)] gap-1 rounded-lg border border-black bg-[#ffffe1] p-3 text-[12px] text-black shadow-[2px_2px_6px_rgb(0_0_0/0.35)] ring-0"
				>
					<div className="flex items-start gap-2">
						<Info className="mt-0.5 size-4 shrink-0 text-[#1f5fc4]" />
						<PopoverTitle className="flex-1 text-[12px] font-bold">
							Welcome to Louis' Menagerie
						</PopoverTitle>
						<button
							type="button"
							aria-label="Close"
							onClick={() => setBalloonOpen(false)}
							className="rounded-[2px] border border-transparent hover:border-[#9c9c9c] hover:bg-white"
						>
							<X className="size-3.5" />
						</button>
					</div>
					<PopoverDescription className="pl-6 text-[12px] text-black">
						Browse my projects from the sidebar, or{" "}
						<button
							type="button"
							className="text-[#0645ad] underline"
							onClick={() => {
								setBalloonOpen(false);
								focusAddressBar();
							}}
						>
							search them from the address bar
						</button>
						.
					</PopoverDescription>
				</PopoverContent>
			</Popover>

			{trayIcons.map(({ label, icon }) => (
				<Tooltip key={label}>
					<TooltipTrigger
						render={
							<span
								role="img"
								className="hidden opacity-95 sm:inline-flex"
								aria-label={label}
							/>
						}
					>
						{icon}
					</TooltipTrigger>
					<TooltipContent side="top">{label}</TooltipContent>
				</Tooltip>
			))}

			<Tooltip>
				<TooltipTrigger
					render={<time className="min-w-[52px] text-center text-[11px]" />}
				>
					{now?.toLocaleTimeString([], {
						hour: "numeric",
						minute: "2-digit",
					}) ?? ""}
				</TooltipTrigger>
				<TooltipContent side="top">
					{now?.toLocaleDateString([], {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</TooltipContent>
			</Tooltip>
		</div>
	);
}
