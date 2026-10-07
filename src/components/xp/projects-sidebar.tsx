import { Link, useLocation } from "@tanstack/react-router";
import { ChevronUp, House, Search, UserIcon, X } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { categories, getProject, projectsIn } from "@/lib/projects";
import { useDesktop } from "./desktop-context";
import { CategoryIcon, FolderIcon } from "./xp-icons";

const menuButtonClass =
	"h-auto min-h-6 rounded-[2px] px-1.5 py-1 text-[12px] text-[#1c3f94] hover:bg-transparent hover:text-[#3d6fe0] hover:underline data-active:bg-[#316ac5] data-active:font-bold data-active:text-white data-active:no-underline";

export function ProjectsSidebar() {
	const { pathname } = useLocation();
	const { setOpen } = useSidebar();
	const { focusAddressBar } = useDesktop();
	const current = getProject(pathname);

	return (
		<Sidebar
			collapsible="none"
			className="xp-taskpane w-60 shrink-0 border-r border-[#7d8aa8] text-[#1c3f94] max-md:absolute max-md:inset-y-0 max-md:left-0 max-md:z-30 max-md:shadow-[4px_0_12px_rgb(0_0_0/0.35)]"
		>
			<SidebarHeader className="flex-row items-center gap-1 border-b border-[#8b98b6] bg-[linear-gradient(180deg,#f6f1e1,#e2d8bc)] px-2 py-1">
				<FolderIcon className="size-4" />
				<span className="flex-1 text-[12px] font-bold text-[#2b2414]">
					My Projects
				</span>
				<button
					type="button"
					aria-label="Close explorer bar"
					onClick={() => setOpen(false)}
					className="rounded-[2px] p-0.5 text-[#3a3424] hover:bg-white/70 hover:shadow-[inset_0_0_0_1px_#b8ab86]"
				>
					<X className="size-3.5" />
				</button>
			</SidebarHeader>

			<SidebarContent className="gap-3 px-3 py-3">
				<TaskPane
					title="Browse"
					icon={<House className="size-4 text-[#215dc6]" />}
				>
					<SidebarMenuItem>
						<SidebarMenuButton
							isActive={pathname === "/about" || pathname === "/about/"}
							className={menuButtonClass}
							render={<Link to="/about" />}
						>
							<UserIcon />
							<span>About me</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							isActive={pathname === "/projects" || pathname === "/projects/"}
							className={menuButtonClass}
							render={<Link to="/projects" />}
						>
							<House />
							<span>All projects</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton
							className={menuButtonClass}
							onClick={focusAddressBar}
						>
							<Search />
							<span>Search the projects…</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</TaskPane>

				{categories.map((category) => {
					const items = projectsIn(category.id);
					return (
						<TaskPane
							key={category.id}
							title={category.label}
							icon={<CategoryIcon category={category.id} className="size-4" />}
							count={items.length}
							defaultOpen={
								!current ||
								current.category === category.id ||
								category.id === "games"
							}
						>
							{items.map((project) => (
								<SidebarMenuItem key={project.to}>
									<SidebarMenuButton
										isActive={pathname === project.to}
										className={menuButtonClass}
										render={<Link to={project.to} />}
									>
										<CategoryIcon category={project.category} />
										<span>{project.title}</span>
									</SidebarMenuButton>
									{project.status === "in-progress" && (
										<SidebarMenuBadge className="top-1! text-[9px] text-[#a0581a] uppercase">
											wip
										</SidebarMenuBadge>
									)}
								</SidebarMenuItem>
							))}
						</TaskPane>
					);
				})}
			</SidebarContent>
		</Sidebar>
	);
}

function TaskPane({
	title,
	icon,
	count,
	defaultOpen = true,
	menu = true,
	children,
}: {
	title: string;
	icon: ReactNode;
	count?: number;
	defaultOpen?: boolean;
	menu?: boolean;
	children: ReactNode;
}) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<Collapsible
			open={open}
			onOpenChange={setOpen}
			className="shrink-0 overflow-hidden rounded-t-[5px] shadow-[0_1px_2px_rgb(0_0_0/0.25)]"
		>
			<SidebarGroup className="p-0">
				<SidebarGroupLabel
					render={<CollapsibleTrigger />}
					className="group/pane xp-pane-header h-[25px] w-full cursor-pointer gap-1.5 rounded-none px-2 text-[12px] font-bold text-[#215dc6] hover:text-[#428eff]"
				>
					{icon}
					<span className="flex-1 text-left">{title}</span>
					{count !== undefined && (
						<span className="text-[10px] font-normal text-[#6b7a99]">
							{count}
						</span>
					)}
					<span className="flex size-[17px] items-center justify-center rounded-full border border-[#a7b5d6] bg-white shadow-[0_1px_1px_rgb(0_0_0/0.15)]">
						<ChevronUp className="size-3! transition-transform group-not-data-panel-open/pane:rotate-180" />
					</span>
				</SidebarGroupLabel>
				<CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
					<SidebarGroupContent className="border-x border-b border-white bg-[#f3ecd6]/95 p-1.5">
						{menu ? (
							<SidebarMenu className="gap-0.5">{children}</SidebarMenu>
						) : (
							children
						)}
					</SidebarGroupContent>
				</CollapsibleContent>
			</SidebarGroup>
		</Collapsible>
	);
}
