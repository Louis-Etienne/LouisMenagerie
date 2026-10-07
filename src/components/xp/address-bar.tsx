import { useLocation, useNavigate, useRouter } from "@tanstack/react-router";
import { Command as CommandPrimitive } from "cmdk";
import { ArrowRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@/components/ui/command";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import {
	categories,
	type Project,
	SITE_HOST,
	searchProjects,
} from "@/lib/projects";
import { useDesktop } from "./desktop-context";
import { CategoryIcon, IEIcon } from "./xp-icons";

const itemClass =
	"rounded-none px-2 py-1 text-[12px] data-[selected=true]:bg-xp-select data-[selected=true]:text-white data-[selected=true]:*:[svg]:text-white!";

function toPath(input: string) {
	const stripped = input
		.trim()
		.replace(/^https?:\/\//i, "")
		.replace(/^www\.louismenagerie\.com/i, "");
	return stripped.startsWith("/") ? stripped : null;
}

export function AddressBar() {
	const location = useLocation();
	const navigate = useNavigate();
	const router = useRouter();
	const { registerAddressBar } = useDesktop();
	const inputRef = useRef<HTMLInputElement>(null);
	const [focused, setFocused] = useState(false);
	const [query, setQuery] = useState("");

	useEffect(() => {
		registerAddressBar(() => inputRef.current?.focus());
	}, [registerAddressBar]);

	const url = `${SITE_HOST}${location.href}`;
	const trimmed = query.trim();
	const path = toPath(trimmed);
	const matches = searchProjects(trimmed);

	function finish() {
		setQuery("");
		inputRef.current?.blur();
	}

	function submit() {
		if (!trimmed) {
			finish();
			return;
		}
		if (path) {
			router.history.push(path);
		} else {
			navigate({ to: "/projects", search: { q: trimmed } });
		}
		finish();
	}

	function open(project: Project) {
		navigate({ to: project.to });
		finish();
	}

	return (
		<div className="flex items-center gap-1 border-b border-[#c8bc98] px-1.5 py-[3px]">
			<span className="hidden px-1 text-[12px] text-[#6d6046] sm:inline">
				Address
			</span>
			<Command
				shouldFilter={false}
				loop
				className="relative h-auto min-w-0 flex-1 overflow-visible rounded-none! bg-transparent p-0"
			>
				<InputGroup className="xp-field h-[23px] has-[[data-slot=input-group-control]:focus-visible]:ring-0">
					<InputGroupAddon className="pl-1">
						<IEIcon className="size-4" />
					</InputGroupAddon>
					<CommandPrimitive.Input
						ref={inputRef}
						data-slot="input-group-control"
						aria-label="Address and search bar"
						placeholder="Search my projects or type an address"
						value={focused ? query : url}
						onValueChange={setQuery}
						onFocus={(event) => {
							setFocused(true);
							event.currentTarget.select();
						}}
						onBlur={() => {
							setFocused(false);
							setQuery("");
						}}
						onKeyDown={(event) => {
							if (event.key === "Escape") finish();
						}}
						className="h-full min-w-0 flex-1 bg-transparent px-1 text-[12px] text-black outline-none placeholder:text-[#8a8a8a]"
					/>
					<InputGroupAddon align="inline-end" className="hidden pr-1 md:flex">
						<Kbd className="h-4 rounded-sm border border-[#c9c2ad] bg-[#f4f1e6] text-[10px]">
							Enter
						</Kbd>
					</InputGroupAddon>
				</InputGroup>

				{focused && (
					<CommandList
						onMouseDown={(event) => event.preventDefault()}
						className="absolute inset-x-0 top-full z-50 mt-px max-h-[min(22rem,60vh)] border border-[#7f9db9] bg-white text-black shadow-[2px_3px_6px_rgb(0_0_0/0.3)]"
					>
						{trimmed && (
							<>
								<CommandGroup>
									<CommandItem
										value="__submit__"
										onSelect={submit}
										className={itemClass}
									>
										{path ? <ArrowRight /> : <Search />}
										<span className="truncate">
											{path ? (
												<>
													Go to{" "}
													<b>
														{SITE_HOST}
														{path}
													</b>
												</>
											) : (
												<>
													Search projects for <b>“{trimmed}”</b>
												</>
											)}
										</span>
										<CommandShortcut className="group-data-[selected=true]/command-item:text-white">
											↵
										</CommandShortcut>
									</CommandItem>
								</CommandGroup>
								<CommandSeparator className="mx-0" />
							</>
						)}
						<CommandEmpty className="py-4 text-[12px] text-[#555]">
							No projects match “{trimmed}”.
						</CommandEmpty>
						{categories.map((category) => {
							const inCategory = matches.filter(
								(project) => project.category === category.id,
							);
							if (inCategory.length === 0) return null;
							return (
								<CommandGroup
									key={category.id}
									heading={category.label}
									className="p-0 **:[[cmdk-group-heading]]:bg-[#f1efe2] **:[[cmdk-group-heading]]:py-1 **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:text-[#5a5a5a]"
								>
									{inCategory.map((project) => (
										<CommandItem
											key={project.to}
											value={project.to}
											onSelect={() => open(project)}
											className={itemClass}
										>
											<CategoryIcon category={project.category} />
											<span className="font-bold">{project.title}</span>
											<span className="truncate opacity-70">
												— {project.tagline}
											</span>
										</CommandItem>
									))}
								</CommandGroup>
							);
						})}
					</CommandList>
				)}
			</Command>
			<Button
				variant="ghost"
				className="xp-toolbar-btn"
				onMouseDown={(event) => event.preventDefault()}
				onClick={() => (focused ? submit() : inputRef.current?.focus())}
			>
				<span className="xp-nav-orb size-[18px]">
					<ArrowRight className="size-3" strokeWidth={3} />
				</span>
				Go
			</Button>
		</div>
	);
}
