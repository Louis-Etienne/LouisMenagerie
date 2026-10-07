import { useNavigate, useRouter } from "@tanstack/react-router";
import { type ReactNode, useState } from "react";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";
import { BlissBackground } from "./bliss-background";
import { DesktopProvider, useDesktop } from "./desktop-context";
import { InternetExplorer } from "./internet-explorer";
import { PowerOverlay } from "./power";
import { Taskbar } from "./taskbar";
import { XpDialog } from "./xp-dialog";
import { FolderIcon, IEIcon, RecycleBinIcon } from "./xp-icons";

export function Desktop({ children }: { children: ReactNode }) {
	return (
		<DesktopProvider>
			<main className="fixed inset-0 overflow-hidden">
				<BlissBackground />
				<DesktopSurface />
				<InternetExplorer>{children}</InternetExplorer>
				<Taskbar />
				<PowerOverlay />
			</main>
		</DesktopProvider>
	);
}

type IconId = "ie" | "projects" | "bin";
type SortKey = "name" | "type";

const menuClass =
	"min-w-44 rounded-none border border-[#aca899] bg-white p-0.5 text-black shadow-[2px_2px_4px_rgb(0_0_0/0.35)] ring-0";
const itemClass =
	"rounded-none py-[3px] text-[12px] focus:bg-xp-select focus:text-white";

function DesktopSurface() {
	const desktop = useDesktop();
	const navigate = useNavigate();
	const router = useRouter();
	const [selected, setSelected] = useState<IconId | null>(null);
	const [sort, setSort] = useState<SortKey>("type");
	const [binOpen, setBinOpen] = useState(false);

	const icons = [
		{
			id: "ie" as const,
			label: "Internet Explorer",
			type: "shortcut",
			icon: <IEIcon className="size-12" />,
			open: desktop.openBrowser,
		},
		{
			id: "projects" as const,
			label: "My Projects",
			type: "folder",
			icon: <FolderIcon className="size-12" />,
			open: () => {
				navigate({ to: "/projects" });
				desktop.openBrowser();
			},
		},
	].sort((a, b) =>
		sort === "name"
			? a.label.localeCompare(b.label)
			: a.type.localeCompare(b.type),
	);

	return (
		<>
			<ContextMenu>
				<ContextMenuTrigger
					className="absolute inset-x-0 top-0 bottom-[30px]"
					onClick={() => setSelected(null)}
				>
					<div className="flex flex-col items-start gap-4 p-3">
						{icons.map((icon) => (
							<DesktopIcon
								key={icon.id}
								label={icon.label}
								selected={selected === icon.id}
								onSelect={() => setSelected(icon.id)}
								onOpen={icon.open}
							>
								{icon.icon}
							</DesktopIcon>
						))}
					</div>
					<div className="absolute right-3 bottom-3">
						<DesktopIcon
							label="Recycle Bin"
							selected={selected === "bin"}
							onSelect={() => setSelected("bin")}
							onOpen={() => setBinOpen(true)}
						>
							<RecycleBinIcon className="size-12" />
						</DesktopIcon>
					</div>
				</ContextMenuTrigger>
				<ContextMenuContent className={menuClass}>
					<ContextMenuSub>
						<ContextMenuSubTrigger className={itemClass}>
							Arrange Icons By
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className={menuClass}>
							<ContextMenuRadioGroup
								value={sort}
								onValueChange={(value) => setSort(value as SortKey)}
							>
								<ContextMenuRadioItem value="name" className={itemClass}>
									Name
								</ContextMenuRadioItem>
								<ContextMenuRadioItem value="type" className={itemClass}>
									Type
								</ContextMenuRadioItem>
							</ContextMenuRadioGroup>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuItem
						className={itemClass}
						onClick={() => router.invalidate()}
					>
						Refresh <ContextMenuShortcut>F5</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuItem className={itemClass} onClick={desktop.openBrowser}>
						Open Internet Explorer
					</ContextMenuItem>
					<ContextMenuItem
						className={itemClass}
						onClick={desktop.focusAddressBar}
					>
						Search projects… <ContextMenuShortcut>Ctrl+F</ContextMenuShortcut>
					</ContextMenuItem>
					<ContextMenuSeparator />
					<ContextMenuSub>
						<ContextMenuSubTrigger className={itemClass}>
							New
						</ContextMenuSubTrigger>
						<ContextMenuSubContent className={menuClass}>
							<ContextMenuItem className={itemClass} disabled>
								Folder
							</ContextMenuItem>
							<ContextMenuItem className={itemClass} disabled>
								Shortcut
							</ContextMenuItem>
						</ContextMenuSubContent>
					</ContextMenuSub>
					<ContextMenuSeparator />
					<ContextMenuItem className={itemClass} disabled>
						Properties
					</ContextMenuItem>
				</ContextMenuContent>
			</ContextMenu>

			<XpDialog
				open={binOpen}
				onOpenChange={setBinOpen}
				title="Recycle Bin"
				icon={<RecycleBinIcon className="size-4" />}
				description="The Recycle Bin is empty. Every project, even the embarrassing ones, made it into the portfolio."
			/>
		</>
	);
}

function DesktopIcon({
	label,
	selected,
	onSelect,
	onOpen,
	children,
}: {
	label: string;
	selected: boolean;
	onSelect: () => void;
	onOpen: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={(event) => {
				event.stopPropagation();
				onSelect();
			}}
			onDoubleClick={onOpen}
			onKeyDown={(event) => {
				if (event.key === "Enter") onOpen();
			}}
			className="group flex w-[76px] flex-col items-center gap-1 outline-none"
		>
			<span
				className={cn(
					"drop-shadow-[2px_2px_2px_rgb(0_0_0/0.4)]",
					selected && "opacity-75",
				)}
			>
				{children}
			</span>
			<span
				className={cn(
					"px-0.5 text-center text-[11px] leading-tight text-white [text-shadow:1px_1px_1px_#000]",
					selected && "xp-selected-icon",
				)}
			>
				{label}
			</span>
		</button>
	);
}
