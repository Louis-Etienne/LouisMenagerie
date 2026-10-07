import { createFileRoute } from "@tanstack/react-router";
import { ProjectPage } from "@/components/xp/project-page";

export const Route = createFileRoute("/projects/websites/XPPortfolio")({
	component: () => <ProjectPage to="/projects/websites/XPPortfolio" />,
});
