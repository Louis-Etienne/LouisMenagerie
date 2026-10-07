import { Link } from "@tanstack/react-router";
import { GitBranch, KeyRound, Power, Search } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories, projects, projectsIn } from "@/lib/projects";
import { useDesktop } from "./desktop-context";
import { TurnOffDialog } from "./power";
import { CategoryIcon, FolderIcon, IEIcon, WindowsFlag } from "./xp-icons";

const itemClass =
	"rounded-none px-1.5 py-1 text-[12px] text-black focus:bg-xp-select focus:text-white focus:**:text-white!";
const subContentClass =
	"min-w-52 rounded-none border border-[#7f9db9] bg-white p-0.5 shadow-[2px_2px_4px_rgb(0_0_0/0.35)] ring-0";

const featured = projects.filter((project) =>
	[
		"Not A Sandbox",
		"BlackJack Coop",
		"Programmer 101",
		"Testing DirectX11",
		"Free Carve",
	].includes(project.title),
);

export function StartMenu() {
	const desktop = useDesktop();
	const [turnOffOpen, setTurnOffOpen] = useState(false);

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<button
							type="button"
							className="xp-start flex h-full shrink-0 items-center gap-1.5 rounded-r-[12px] pr-5 pl-2.5 font-display text-[19px] font-bold text-white italic"
						/>
					}
				>
					<WindowsFlag className="size-[22px] drop-shadow-[1px_1px_1px_rgb(0_0_0/0.5)]" />
					<span className="-mt-0.5 lowercase">start</span>
				</DropdownMenuTrigger>

				<DropdownMenuContent
					side="top"
					align="start"
					sideOffset={0}
					className="w-[min(410px,100vw)] max-h-none overflow-visible rounded-none rounded-t-lg bg-[#4282d6] p-0 ring-0 shadow-[2px_-2px_8px_rgb(0_0_0/0.4)]"
				>
					<div className="xp-start-header flex items-center gap-2 rounded-t-lg px-2 py-1.5">
						<Avatar className="size-11 rounded-[3px] border-2 border-white/80 shadow-md after:rounded-[3px]">
							<AvatarFallback className="rounded-[3px] bg-[linear-gradient(135deg,#f7d36a,#e0761c)] font-display text-lg font-bold text-white">
								L
							</AvatarFallback>
						</Avatar>
						<span className="font-display text-[15px] font-bold text-white [text-shadow:1px_1px_1px_rgb(0_0_0/0.5)]">
							Louis
						</span>
					</div>
					<div className="h-[2px] bg-[linear-gradient(90deg,transparent,#f99736_30%,#f99736_70%,transparent)]" />

					<div className="grid grid-cols-[1fr_0.9fr] border-x border-[#4282d6]">
						<div className="flex flex-col bg-white p-1">
							<DropdownMenuGroup>
								<DropdownMenuItem
									className={itemClass}
									render={<Link to="/projects" />}
									onClick={desktop.openBrowser}
								>
									<IEIcon className="size-8!" />
									<span className="flex flex-col leading-tight">
										<b>Internet</b>
										<span className="text-[11px] opacity-70">My Projects</span>
									</span>
								</DropdownMenuItem>
								<DropdownMenuItem
									className={itemClass}
									onClick={desktop.focusAddressBar}
								>
									<span className="flex size-8 items-center justify-center">
										<Search className="size-6! text-[#1f5fc4]" />
									</span>
									<span className="flex flex-col leading-tight">
										<b>Search</b>
										<span className="text-[11px] opacity-70">
											Find a project
										</span>
									</span>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator className="mx-1 bg-[linear-gradient(90deg,transparent,#a7a7a7,transparent)]" />
							<DropdownMenuGroup>
								{featured.map((project) => (
									<DropdownMenuItem
										key={project.to}
										className={itemClass}
										render={<Link to={project.to} />}
										onClick={desktop.openBrowser}
									>
										<CategoryIcon
											category={project.category}
											className="size-5!"
										/>
										{project.title}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<div className="mt-auto">
								<DropdownMenuSeparator className="mx-1 bg-[linear-gradient(90deg,transparent,#a7a7a7,transparent)]" />
								<DropdownMenuSub>
									<DropdownMenuSubTrigger
										className={`${itemClass} justify-center gap-2 font-bold`}
									>
										All Programs
										<span className="xp-nav-orb size-4 text-[10px]">▶</span>
									</DropdownMenuSubTrigger>
									<DropdownMenuSubContent className={subContentClass}>
										{categories.map((category) => (
											<DropdownMenuSub key={category.id}>
												<DropdownMenuSubTrigger className={itemClass}>
													<FolderIcon className="size-4" />
													{category.label}
												</DropdownMenuSubTrigger>
												<DropdownMenuSubContent className={subContentClass}>
													{projectsIn(category.id).map((project) => (
														<DropdownMenuItem
															key={project.to}
															className={itemClass}
															render={<Link to={project.to} />}
															onClick={desktop.openBrowser}
														>
															<CategoryIcon category={project.category} />
															{project.title}
														</DropdownMenuItem>
													))}
												</DropdownMenuSubContent>
											</DropdownMenuSub>
										))}
									</DropdownMenuSubContent>
								</DropdownMenuSub>
							</div>
						</div>

						<div className="flex flex-col border-l border-[#95bdee] bg-[#d3e5fa] p-1">
							<DropdownMenuGroup>
								{categories.map((category) => (
									<DropdownMenuItem
										key={category.id}
										className={`${itemClass} font-bold text-[#0a246a]`}
										render={
											<Link to="/projects" search={{ category: category.id }} />
										}
										onClick={desktop.openBrowser}
									>
										<CategoryIcon category={category.id} className="size-5!" />
										My {category.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuGroup>
							<DropdownMenuSeparator className="mx-1 bg-[#95bdee]" />
							<DropdownMenuItem
								className={`${itemClass} text-[#0a246a]`}
								render={(props) => (
									<a
										{...props}
										href="https://github.com/Louis-Etienne"
										target="_blank"
										rel="noreferrer"
									/>
								)}
							>
								<GitBranch className="size-5!" />
								GitHub
							</DropdownMenuItem>
							<DropdownMenuItem
								className={`${itemClass} text-[#0a246a]`}
								onClick={desktop.focusAddressBar}
							>
								<span className="flex size-5 items-center justify-center rounded-[2px] bg-[#1f5fc4] text-[10px] font-bold text-white">
									R
								</span>
								Run…
							</DropdownMenuItem>
						</div>
					</div>

					<div className="xp-start-footer flex justify-end gap-1 px-2 py-1.5">
						<DropdownMenuItem
							className="rounded-[2px] px-1.5 py-1 text-[12px] text-white focus:bg-white/15 focus:text-white"
							onClick={() => desktop.setPower("welcome")}
						>
							<span className="flex size-6 items-center justify-center rounded-[3px] bg-[linear-gradient(180deg,#f8b33f,#d7790b)] shadow-sm">
								<KeyRound className="size-4! text-white" />
							</span>
							Log Off
						</DropdownMenuItem>
						<DropdownMenuItem
							className="rounded-[2px] px-1.5 py-1 text-[12px] text-white focus:bg-white/15 focus:text-white"
							onClick={() => setTurnOffOpen(true)}
						>
							<span className="flex size-6 items-center justify-center rounded-[3px] bg-[linear-gradient(180deg,#f07b5b,#c4290e)] shadow-sm">
								<Power className="size-4! text-white" strokeWidth={3} />
							</span>
							Turn Off Computer
						</DropdownMenuItem>
					</div>
				</DropdownMenuContent>
			</DropdownMenu>

			<TurnOffDialog open={turnOffOpen} onOpenChange={setTurnOffOpen} />
		</>
	);
}
