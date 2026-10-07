import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/console/ConsoleSnake")({
	component: () => <ProjectPage to="/projects/console/ConsoleSnake" />,
});
