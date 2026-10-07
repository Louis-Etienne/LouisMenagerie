import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/console/ConsoleCalculator")({
	component: () => <ProjectPage to="/projects/console/ConsoleCalculator" />,
});
