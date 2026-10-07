import apagosMenu from "@/data/Apagos/g1.png";
import apagosBoard from "@/data/Apagos/g2.png";
import apagosBoard2 from "@/data/Apagos/g3.png";
import apagosRules from "@/data/Apagos/g4.png";
import apagosSettings from "@/data/Apagos/g5.PNG";
import freeCarveVideo from "@/data/FreeCarve/video_freecarve.mp4";
import type { FileRoutesByTo } from "@/routeTree.gen";

export type ProjectRoute = Extract<
	keyof FileRoutesByTo,
	`/projects/${string}/${string}`
>;

export type CategoryId =
	| "games"
	| "softwares"
	| "websites"
	| "console"
	| "hardware";

export interface Category {
	id: CategoryId;
	label: string;
	description: string;
}

export type ProjectMedia =
	| { type: "image"; src: string; alt: string; caption?: string }
	| {
			type: "video";
			src: string;
			alt: string;
			caption?: string;
			poster?: string;
	  };

export interface Project {
	to: ProjectRoute;
	title: string;
	category: CategoryId;
	tagline: string;
	summary: string[];
	learned?: string[];
	tech: string[];
	context?: string;
	status: "released" | "school" | "in-progress";
	year: string;
	media?: ProjectMedia[];
}

export const categories: Category[] = [
	{
		id: "games",
		label: "Games",
		description:
			"Board games, RPGs, physics sandboxes and other playable things.",
	},
	{
		id: "softwares",
		label: "Software",
		description:
			"Desktop tools, graphics experiments and engineering projects.",
	},
	{
		id: "websites",
		label: "Websites",
		description: "Things that live in a browser, including this one.",
	},
	{
		id: "console",
		label: "Console Apps",
		description: "Where it all began: tiny C# programs in a black window.",
	},
	{
		id: "hardware",
		label: "Hardware",
		description: "Projects with cables, screws and blinking lights.",
	},
];

export const projects: Project[] = [
	{
		to: "/projects/games/NotASandbox",
		title: "Not A Sandbox",
		category: "games",
		tagline: "Is it a sandbox? Or not?",
		context: "CEGEP group project",
		status: "school",
		year: "2023",
		tech: ["C++", "2D physics", "Rigid bodies", "Soft bodies"],
		summary: [
			"A sandbox interface that emulates the basics of Dynamics — the physics of forces and motion — from scratch in 2D. The goal was to deepen our understanding of Newtonian physics by building our own 2D physics engine.",
			"Beyond fixed-timestep motion, rotational dynamics, collision detection/solving and friction, the team found time for more exotic features: joints, fluid dynamics, soft bodies and a mesh builder.",
		],
		learned: [
			"Leading a team: drafting the schematics and building the foundation of the framework as the unofficial project director.",
			"There is waaaay more to Dynamics than acceleration and speed.",
		],
	},
	{
		to: "/projects/games/BlackjackCoop",
		title: "BlackJack Coop",
		category: "games",
		tagline: "Black Jack, but, like, coop…",
		status: "released",
		year: "2021",
		tech: ["Qt", "C++", "TCP networking", "Client/Server"],
		summary: [
			"A cooperative BlackJack game where people from around the globe play together against a dealer bot that peeks through the deck to optimise its draws.",
			"Turn by turn, players Hit, Stand or Double Down, see each other's cards and choose how many tokens to bet.",
		],
		learned: [
			"Networking is haaaard: multiplayer forces you to rethink the whole architecture of an application.",
			"Server logs are an underrated debugging superpower.",
		],
	},
	{
		to: "/projects/games/Programmer101",
		title: "Programmer 101",
		category: "games",
		tagline: "This project is weird",
		context: "Final IB project of high school",
		status: "school",
		year: "2020",
		tech: ["Processing", "Custom language", "Game design"],
		summary: [
			"A learning game that guides the player through the fundamentals of programming — in French. Ten levels where you complete tasks by writing code in a homemade language, inside a homemade editor.",
			"The levels slowly introduce variables, functions, conditionals and loops.",
		],
		learned: [
			"Thinking like a compiler: writing a parser that fragments code and executes it by a well defined priority list.",
			"Designing a learning curve for complete newcomers.",
		],
	},
	{
		to: "/projects/games/TheGame",
		title: "The Game",
		category: "games",
		tagline: "Incredible name for a game!",
		context: "CEGEP team project",
		status: "school",
		year: "2022",
		tech: ["Android Studio", "Java", "Gimp", "Bosca Ceoil"],
		summary: [
			"A simple mobile game: dodge the falling blocks, collect coins and spend them on skins. Includes a highscore system saved on the phone.",
		],
		learned: [
			"Bending Android Studio's event-based architecture into a proper game loop.",
		],
	},
	{
		to: "/projects/games/Apagos",
		title: "Apagos",
		category: "games",
		tagline: "Computer board game!!",
		status: "school",
		year: "2022",
		media: [
			{ type: "image", src: apagosMenu, alt: "Menu screen of Apagos" },
			{ type: "image", src: apagosBoard, alt: "Board of Apagos" },
			{ type: "image", src: apagosBoard2, alt: "Board of Apagos, mid-game" },
			{ type: "image", src: apagosRules, alt: "Rules of Apagos" },
			{ type: "image", src: apagosSettings, alt: "Settings of Apagos" },
		],
		tech: ["Qt", "C++", "Drag and drop"],
		summary: [
			"A fully functional recreation of the Apagos board game built with the Qt API, with animations, drag and drop and couch multiplayer.",
		],
	},
	{
		to: "/projects/games/Nba2k",
		title: "N-B-A 2k20",
		category: "games",
		tagline: "2K don't sue me please",
		status: "released",
		year: "2019",
		tech: ["Processing", "Box2D"],
		summary: [
			"A little minigame where you shoot a ball through a hoop, using Processing as a game engine and Box2D to compute the 2D physics.",
		],
		learned: [
			"Using libraries! Box2D was the first big library I used instead of programming everything from scratch.",
		],
	},
	{
		to: "/projects/games/TheBoringRPG",
		title: "The Boring RPG",
		category: "games",
		tagline: "Yeah, the game isn't thrilling",
		status: "released",
		year: "2020",
		tech: ["Processing", "Gimp", "Procedural generation"],
		summary: [
			"A mix of Pokémon and a randomly generated dungeon crawler. Pick a class, enter a dungeon with multiple stages and move room to room meeting enemies, loot, shops, events and a boss at each stage.",
		],
		learned: [
			"Making content is hard: engaging content for a whole game takes far more effort than the systems behind it.",
		],
	},
	{
		to: "/projects/softwares/TestingDirectX11",
		title: "Testing DirectX11",
		category: "softwares",
		tagline: "Tests! Woohoo!",
		status: "released",
		year: "2021",
		tech: ["C++", "DirectX 11", "Win32", "HLSL"],
		summary: [
			"A testing ground for the DirectX 11 API: a scene where a free camera navigates a 3D environment to observe different rendering phenomena, written with nothing but DirectX 11 and Win32.",
		],
		learned: [
			"The math behind computer graphics: matrices, vertices, indices, normals and the rendering pipeline.",
		],
	},
	{
		to: "/projects/softwares/FreeCarve",
		title: "Free Carve",
		category: "softwares",
		tagline: "Free is good, nothing is better than free",
		context: "Software Engineering (OOP) class, team of 5",
		status: "school",
		year: "2024",
		media: [{ type: "video", src: freeCarveVideo, alt: "Free Carve demo" }],
		tech: ["Java", "Swing", "GCODE", "GRASP"],
		summary: [
			"A GCODE generator for CNC machines that emulates a panel saw, with a user friendly UI designed by the team.",
		],
		learned: [
			"The WHY of object oriented programming through the GRASP principles: low coupling, high cohesion, protected variations and friends.",
		],
	},
	{
		to: "/projects/softwares/Audito",
		title: "Audito",
		category: "softwares",
		tagline: "Write-up coming soon",
		status: "in-progress",
		year: "2025",
		tech: [],
		summary: [
			"The page for this project is still being written. Check back soon!",
		],
	},
	{
		to: "/projects/softwares/NotDiscord",
		title: "Not Discord",
		category: "softwares",
		tagline: "Write-up coming soon",
		status: "in-progress",
		year: "2026",
		tech: [],
		summary: [
			"The page for this project is still being written. Check back soon!",
		],
	},
	{
		to: "/projects/websites/XPPortfolio",
		title: "XP Portfolio",
		category: "websites",
		tagline: "It is indeed the website you are on!",
		status: "in-progress",
		year: "2026",
		tech: ["React", "TanStack Start", "Tailwind CSS", "shadcn/ui", "Cursor"],
		summary: [
			"This very website: a Windows XP desktop with an animated Bliss wallpaper, a working Start menu and a papyrus-aged Internet Explorer to browse the projects.",
		],
	},
	{
		to: "/projects/websites/LouisMenagerie",
		title: "Louis' Menagerie",
		category: "websites",
		tagline: "The previous version of this portfolio",
		status: "released",
		year: "2023",
		tech: ["React", "React Router", "Express"],
		summary: [
			"A simple website acting as a platform to share my weird projects and doubling as a portfolio. Its layout was heavily inspired by the React Router documentation.",
			"My first real experience with web development.",
		],
	},
	{
		to: "/projects/console/ConsoleSnake",
		title: "Snake!!",
		category: "console",
		tagline: "Every programmer eventually makes this game :)",
		status: "released",
		year: "2019",
		tech: ["C#", ".NET", "Visual Studio"],
		summary: [
			"A recreation of Snake where the snake collects apples without hitting itself or the walls — rendered entirely with ASCII characters in the console.",
		],
	},
	{
		to: "/projects/console/ConsoleCalculator",
		title: "Calculator",
		category: "console",
		tagline: "Do I really need to describe what a calculator is?",
		status: "released",
		year: "2018",
		tech: ["C#", ".NET", "Parsing"],
		summary: [
			"The FIRST fully functional program I ever made: a single line text parser that does math in the console, supporting + − × ÷, parentheses and the standard order of operations.",
		],
	},
	{
		to: "/projects/console/ConsoleHangman",
		title: "Hangman",
		category: "console",
		tagline: "Save the poor guy!",
		status: "released",
		year: "2018",
		tech: ["C#", ".NET"],
		summary: [
			"A little console game where you guess the unknown word letter by letter. Every wrong guess gives the hangman one more limb.",
		],
	},
	{
		to: "/projects/hardware/Servy",
		title: "Servy",
		category: "hardware",
		tagline: "Write-up coming soon",
		status: "in-progress",
		year: "2026",
		tech: [],
		summary: [
			"The page for this project is still being written. Check back soon!",
		],
	},
];

export function getProject(to: string) {
	return projects.find((project) => project.to === to);
}

export function getCategory(id: CategoryId) {
	return categories.find((category) => category.id === id) as Category;
}

export function projectsIn(category: CategoryId) {
	return projects.filter((project) => project.category === category);
}

export function searchProjects(query: string) {
	const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
	if (terms.length === 0) return projects;
	return projects.filter((project) => {
		const haystack = [
			project.title,
			project.tagline,
			getCategory(project.category).label,
			project.year,
			...project.tech,
			...project.summary,
		]
			.join(" ")
			.toLowerCase();
		return terms.every((term) => haystack.includes(term));
	});
}

export function getPageTitle(pathname: string) {
	if (pathname === "/about" || pathname === "/about/") return "About Me";
	return getProject(pathname)?.title ?? "My Projects";
}

export const SITE_HOST = "http://www.louisetiennemessier.com";
