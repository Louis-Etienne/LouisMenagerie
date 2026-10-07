import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRoute,
	HeadContent,
	Link,
	Outlet,
	Scripts,
	useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "@/components/ui/empty";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Desktop } from "@/components/xp/desktop";
import { IEIcon } from "@/components/xp/xp-icons";
import { SITE_HOST } from "@/lib/projects";

import faviconIco from "../assets/favicon.ico?url";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "Louis' Menagerie" },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", href: faviconIco, sizes: "any" },
		],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
	notFoundComponent: PageCannotBeDisplayed,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{children}
				<TanStackDevtools
					config={{ position: "middle-right" }}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	return (
		<TooltipProvider delay={400}>
			<Desktop>
				<Outlet />
			</Desktop>
		</TooltipProvider>
	);
}

function PageCannotBeDisplayed() {
	const { href } = useLocation();

	return (
		<Empty className="mx-auto max-w-2xl items-start px-8 py-10 text-left">
			<EmptyHeader className="max-w-none items-start">
				<div className="flex items-center gap-3">
					<IEIcon className="size-10" />
					<EmptyTitle className="font-display text-2xl font-bold text-[#2a3f73]">
						The page cannot be displayed
					</EmptyTitle>
				</div>
				<EmptyDescription className="font-serif text-[15px] text-[#3a2a16]">
					The page you are looking for (
					<code className="text-[13px]">
						{SITE_HOST}
						{href}
					</code>
					) is currently unavailable. It might have been eaten by the papyrus
					mites, or maybe it never existed.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent className="max-w-none items-start font-serif text-[14px] text-[#3a2a16]">
				<p className="font-bold">Please try the following:</p>
				<ul className="list-disc space-y-1 pl-5">
					<li>Check the spelling in the Address bar.</li>
					<li>Search for a project instead of typing its address.</li>
					<li>Open the home page and browse from the explorer bar.</li>
				</ul>
				<Button
					variant="ghost"
					className="xp-toolbar-btn mt-2 border-[#b8ab86]"
					nativeButton={false}
					render={<Link to="/projects" />}
				>
					Go to My Projects
				</Button>
				<p className="text-[12px] text-[#6f5a3a]">
					HTTP 404 - File not found
					<br />
					Internet Explorer
				</p>
			</EmptyContent>
		</Empty>
	);
}
